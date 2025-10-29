# -*- coding: utf-8 -*-

"""
.. code-block:: bash

    pip install "docpack>=0.1.6,<1.0.0"
"""

import shutil
from pathlib import Path

from docpack.api import GitHubPipeline

dir_here = Path(__file__).absolute().parent
dir_project_root = dir_here.parent.parent
dir_tmp = dir_here / "tmp"
dir_tmp_docs = dir_tmp / "docs"
shutil.rmtree(dir_tmp, ignore_errors=True)
dir_tmp.mkdir()

gh_pipeline = GitHubPipeline(
    domain="github.com",
    account="MacHu-GWU",
    repo=f"sanhe_me-project",
    branch="main",
    dir_repo=dir_project_root,
    include=[
        # Python
        "api/**/*.py",
        "tests/**/*.py",
        "docs/source/**/index.rst",
        "docs/source/**/*.py",
        "bin/**/*.py",
        "README.rst",
        "Makefile",
        "poetry.toml",
        "pyproject.toml",
        ".coveragerc",
        "codecov.yml",
        ".readthedocs.yml",
        "release-history.rst",
        # Node.js
        "app/**/*.css",
        "app/**/*.tsx",
        "app/**/*.ts",
        "components/**/*.tsx",
        "components/**/*.ts",
        "hooks/**/*.tsx",
        "hooks/**/*.ts",
        "lib/**/*.tsx",
        "lib/**/*.ts",
        "components.json",
        "next.config.mjs",
        "package.json",
        "pnpm-lock.yaml",
        "postcss.config.mjs",
        "tailwind.config.ts",
        "tsconfig.json",
    ],
    exclude=[
        # Python
        f"api/tests/**",
        f"api/tests/**/*.*",
        f"api/vendor/**",
        f"api/vendor/**/*.*",
        f"tests/all.py",
        f"tests/**/all.py",
        f"docs/source/index.rst",
        f"docs/source/release-history.rst",
        f"docs/source/conf.py",
        ".venv/**/*.*",
        ".poetry/**/*.*",
        "build/**/*.*",
        "dist/**/*.*",
        "htmlcov/**/*.*",
        "tmp/**/*.*",
        ".pytest_cache/**/*.*",
        ".cache/**/*.*",
        ".coverage",
        # Node.js
        ".next/**/*.*",
        ".vercel/**/*.*",
        "node_modules/**/*.*",
    ],
    dir_out=dir_tmp_docs,
)
gh_pipeline.fetch()

filename = "all_in_one_codebase.txt"
lines = [path.read_text() for path in dir_tmp_docs.glob("*.xml")]
dir_tmp.joinpath(filename).write_text("\n".join(lines), encoding="utf-8")
