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
    space_id="SHPBSA",  # Sanhe Public Facing Blog Staging Area
    # cache_key="2025-08-01",
    cache_key=str(uuid.uuid4()),  # Use a unique cache key for each run
    include=[
        "https://sanhehu.atlassian.net/wiki/spaces/SHPBSA/pages/525533186/sanhe.me+from+404+to+Live+How+I+Rebuilt+My+Personal+Website+with+AI+-+A+Series+Blog",
        "https://sanhehu.atlassian.net/wiki/spaces/SHPBSA/pages/528121875/How+I+Selected+My+Domain+Provider+and+Secured+My+Digital+Foundation",
    ],
    exclude=[],
    dir_out=dir_tmp_docs,
)
confluence_pipeline.fetch()

filename = "all_in_one_knowledge_base.txt"
lines = [path.read_text() for path in dir_tmp_docs.glob("*.xml")]
dir_tmp.joinpath(filename).write_text("\n".join(lines), encoding="utf-8")
