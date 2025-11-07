# -*- coding: utf-8 -*-

import sys
import uuid

from fastapi import FastAPI, Request, Query
from fastapi.responses import JSONResponse, StreamingResponse

import aws_bedrock_runtime_mate.api as aws_bedrock_runtime_mate
from vercel_ai_sdk_mate.api import RequestBody

from sanhe_me.paths import path_enum
from sanhe_me.vendor.ai_sdk_adapter import (
    request_body_to_bedrock_converse_messages,
)
from sanhe_me.one.api import one

app = FastAPI()


def debug(s: str):
    """Print debug info to stdout (shows as [info] in Vercel logs)"""
    print(s, file=sys.stdout)


@app.get("/api/hello")
async def hello_world():
    """
    Hello World API endpoint - 用于测试 FastAPI 集成
    """
    return JSONResponse(
        content={
            "message": "Hello from FastAPI!",
            "status": "success"
        }
    )


@app.post("/api/chat")
async def handle_chat_data(request: Request, protocol: str = Query("data")):
    """
    AI SDK v5 使用 SSE (Server-Sent Events) 格式的 Data Stream Protocol
    文档: https://ai-sdk.dev/docs/ai-sdk-ui/stream-protocol
    """
    import json
    import sys

    # 调试：打印原始请求
    debug("====== Incoming request")
    debug("------ Request Headers")
    for key, value in request.headers.items():
        debug(f"{key}: {value}")
    debug("------ Request Body")
    request_body_data = await request.json()
    request_body_formatted = json.dumps(request_body_data, indent=2, ensure_ascii=False)
    debug(request_body_formatted)

    sys.stderr.flush()

    # 解析消息
    request_body = RequestBody(**request_body_data)

    default_converse_kwargs = aws_bedrock_runtime_mate.ConverseKwargs(
        # 使用跨区域 inference profile，自动分发请求到多个区域，提高吞吐量
        # model_id="us.amazon.nova-micro-v1:0",
        # model_id="us.amazon.nova-lite-v1:0",
        model_id="us.amazon.nova-pro-v1:0",
        system=[
            {"text": path_enum.instruction_content},
            {"text": path_enum.knowledge_base_content},
            {"cachePoint": {"type": "default"}},
        ],
    )  # we can reuse this later

    chat_session = aws_bedrock_runtime_mate.patterns.ChatSession(
        client=one.bsm.bedrockruntime_client,
        converse_kwargs=default_converse_kwargs,
        verbose=False,
    )

    # chat_session._messages = [
    #     {
    #         "role": "user",
    #         "content": [
    #             {"text": path_enum.knowledge_base_content},
    #             {
    #                 "cachePoint": {"type": "default"},
    #             },
    #         ],
    #     },
    #     {
    #         "role": "assistant",
    #         "content": [
    #             {"text": "I’ve reviewed the knowledge base and I’m ready to answer questions based on it."},
    #         ],
    #     },
    # ]
    messages = request_body_to_bedrock_converse_messages(request_body)

    debug("------ Chat request")
    for message in messages:
        debug(message)

    # 调用 Bedrock 处理
    converse_stream_response = chat_session.converse_stream(messages)

    # AI SDK v5 使用 SSE 格式，每行以 "data: " 开头
    # 文本使用 start/delta/end 三阶段模式
    def ai_sdk_v5_message_generator():
        id = str(uuid.uuid4())
        response_text_chunks = []
        usage = None

        # 文本开始
        yield f'data: {json.dumps({"type": "text-start", "id": id})}\n\n'

        # 文本内容（可以分多次发送）
        for event in chat_session.iterate_events(converse_stream_response):
            debug(str(event))
            if event.is_messageStart():
                debug("🚀 Message starting...")
            elif event.is_contentBlockDelta():
                if event.text:
                    response_text_chunks.append(event.text)
                    yield f'data: {json.dumps({"type": "text-delta", "id": id, "delta": event.text})}\n\n'
            elif event.is_messageStop():
                debug(f"\n✅ Done! Stop reason: {event.messageStop.stopReason}")
            elif "metadata" in event.boto3_raw_data:
                usage = event.metadata.usage.boto3_raw_data

        debug("------ Chat response")
        output_text = "".join(response_text_chunks)
        debug(output_text)

        debug("------ Token Usage")
        debug(str(usage))

        sys.stderr.flush()

        # 文本结束
        yield f'data: {json.dumps({"type": "text-end", "id": id})}\n\n'
        # 消息完成标记
        yield f'data: {json.dumps({"type": "finish-message", "finishReason": "stop"})}\n\n'
        # SSE 结束标记
        yield "data: [DONE]\n\n"

    # StreamingResponse 返回 SSE 格式的流
    # v5 使用 x-vercel-ai-ui-message-stream 头而不是 x-vercel-ai-data-stream
    response = StreamingResponse(
        ai_sdk_v5_message_generator(),
        media_type="text/event-stream",  # SSE 的 MIME 类型
    )
    response.headers["x-vercel-ai-ui-message-stream"] = "v1"
    response.headers["Cache-Control"] = "no-cache"
    response.headers["Connection"] = "keep-alive"
    return response
