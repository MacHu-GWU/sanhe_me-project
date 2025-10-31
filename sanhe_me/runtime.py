# -*- coding: utf-8 -*-

import os
from functools import cached_property
import which_runtime.api as which_runtime


class Runtime(which_runtime.Runtime):
    @cached_property
    def is_vercel(self) -> bool:
        return "VERCEL" in os.environ

runtime = Runtime()
