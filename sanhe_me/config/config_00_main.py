# -*- coding: utf-8 -*-

"""
Main configuration module providing centralized environment and application settings.

This module contains the core configuration classes that serve as the foundation for all
application configuration management, integrating environment-specific settings with
multi-environment detection and providing type-safe configuration access patterns.
"""

import dataclasses
from functools import cached_property

import aws_config.api as aws_config

from ..env import EnvNameEnum, detect_current_env

# You may have a long list of config field definition
# put them in different module and use Mixin class


class Env(
    aws_config.BaseEnv,
):
    """
    Environment-specific configuration container with Lambda function integration.

    Combines base environment settings with Lambda function and deployment configurations
    using mixin classes to provide a comprehensive configuration interface for each
    deployment environment while maintaining clear separation of concerns.
    """


@dataclasses.dataclass
class Config(
    aws_config.BaseConfig[Env, EnvNameEnum],
):
    """
    Main configuration class providing environment-aware configuration management.

    Extends the base configuration to provide type-safe access to environment-specific
    configurations with automatic environment detection and cached property access
    for efficient configuration loading and cross-environment operations.
    """

    @classmethod
    def get_current_env(cls) -> str:  # pragma: no cover
        return detect_current_env()

    @cached_property
    def devops(self) -> Env:  # pragma: no cover
        return self.get_env(env_name=EnvNameEnum.devops.value)

    @cached_property
    def dev(self):  # pragma: no cover
        return self.get_env(env_name=EnvNameEnum.dev.value)

    @cached_property
    def tst(self) -> Env:  # pragma: no cover
        return self.get_env(env_name=EnvNameEnum.tst.value)

    @cached_property
    def prd(self) -> Env:  # pragma: no cover
        return self.get_env(env_name=EnvNameEnum.prd.value)

    @cached_property
    def env(self) -> Env:
        return self.get_env(env_name=self.get_current_env())
