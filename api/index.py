# -*- coding: utf-8 -*-

from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()


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


@app.get("/api/python")
async def python_endpoint():
    """
    保持与原 Flask 端点兼容的 API
    """
    return JSONResponse(
        content={
            "message": "Hello, World!",
            "framework": "FastAPI"
        }
    )
