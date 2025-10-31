# -*- coding: utf-8 -*-

"""
Core singleton class combining all mixin functionality for centralized resource access.

This module provides the main One class that aggregates all specialized mixin functionality
into a single entry point, enabling lazy-loaded access to configuration, AWS services,
DevOps operations, and documentation generation through a unified singleton interface.
"""

try:
    from pywf_internal_proprietary.api import PyWf
except ImportError:  # pragma: no cover
    pass

from ..runtime import runtime
from ..paths import path_enum

from .one_01_bsm import OneBsmMixin
from .one_02_config import OneConfigMixin

instruction = path_enum.path_instruction_md.read_text(encoding="utf-8")
knowledge_base = path_enum.path_knowledge_base_md.read_text(encoding="utf-8")


class One(
    OneBsmMixin,
    OneConfigMixin,
):  # pragma: no cover
    """
    Main singleton class providing unified access to all application resources and services.
    """

    runtime = runtime

    @property
    def pywf(self) -> "PyWf":
        """
        Access Python project metadata and dependency information from pyproject.toml.
        """
        return PyWf.from_pyproject_toml(path_enum.path_pyproject_toml)

    def handle_chat_message(
        self,
        msg: str,
    ) -> str:
        from boto3_dataclass_bedrock_runtime import bedrock_runtime_caster

        # 使用跨区域 inference profile，自动分发请求到多个区域，提高吞吐量
        # 不再使用单区域 model ID: "amazon.nova-micro-v1:0"（会受限于单区域配额）
        model_id = "us.amazon.nova-micro-v1:0"  # US 跨区域 profile，无需完整 ARN
        messages = [
            {
                "role": "user",
                "content": [
                    {
                        "text": knowledge_base,
                    },
                    {
                        "cachePoint": {"type": "default"},
                    },
                ],
            },
            {
                "role": "assistant",
                "content": [
                    {"text": "我已经理解了提供的背景知识库,可以基于这些信息回答问题。"},
                ],
            },
            {
                "role": "user",
                "content": [
                    {"text": msg},
                ],
            },
        ]
        system = [
            {
                "text": instruction,
            },
            {"cachePoint": {"type": "default"}},
        ]
        res = self.bsm.bedrockruntime_client.converse(
            modelId=model_id,
            messages=messages,
            system=system,
        )
        res = bedrock_runtime_caster.converse(res)
        print(res.usage)
        return res.output.message.content[0].text


one = One()
