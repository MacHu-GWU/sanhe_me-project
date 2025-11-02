# -*- coding: utf-8 -*-

"""
.. code-block:: bash

    pip install "home_secret>=0.1.1,<1.0.0"
    pip install "docpack>=0.1.6,<1.0.0"
"""

import uuid
import shutil
from pathlib import Path
from home_secret.api import hs
from pyatlassian.api import confluence
from docpack.api import ConfluencePipeline

site_url = hs.v("providers.atlassian.accounts.sh.site_url")
email = hs.v("providers.atlassian.accounts.sh.users.sh.email")
token = hs.v("providers.atlassian.accounts.sh.users.sh.secrets.sync_page.value")
confluence = confluence.Confluence(
    url=site_url,
    username=email,
    password=token,
)

dir_here = Path(__file__).absolute().parent
dir_tmp = dir_here / "tmp"
dir_tmp_docs = dir_tmp / "docs"
shutil.rmtree(dir_tmp, ignore_errors=True)
dir_tmp.mkdir()

confluence_pipeline = ConfluencePipeline(
    confluence=confluence,
    space_id="HSH",  # Sanhe Hu
    cache_key=str(uuid.uuid4()),  # Use a unique cache key for each run
    include=[
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/629440574/2023-09+to+2024-06+-+Enterprise+AI+Observability+Platform",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/629538817/2024-06+to+2025-01+-+Enterprise+Knowledge+Integration+System1",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/630685698/2024-11+to+2025-10+-+Enterprise+MCP+Infrastructure",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/630587394/2023-09+to+2025-10+-+Multi-Agent+Solution+Evolution",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/630718465/2024-08+to+2024-12+-+AI+Transformation+Consulting+Framework",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/629637125/Sanhe+s+Skill+Point",
    ],
    exclude=[],
    dir_out=dir_tmp_docs,
    wanted_fields=[
        "title",
        "markdown_content",
    ],
)
confluence_pipeline.fetch()

filename = "all_in_one_knowledge_base.txt"
lines = [path.read_text() for path in dir_tmp_docs.glob("*.xml")]
dir_tmp.joinpath(filename).write_text("\n".join(lines), encoding="utf-8")
