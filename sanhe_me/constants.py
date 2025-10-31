# -*- coding: utf-8 -*-

import json
from functools import cached_property

from .paths import path_enum


class Constants:
    @cached_property
    def suggested_actions(self) -> list[str]:
        path = path_enum.path_suggested_actions_json
        data = json.loads(path.read_text(encoding="utf-8"))
        actions = [dct["action"] for dct in data]
        return actions


constants = Constants()
