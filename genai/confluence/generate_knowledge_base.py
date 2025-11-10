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
        # About Me
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/630325346/About+Me+Sanhe+Hu",
        # Skill
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/629637125/Sanhe+s+Skill+Point",
        # Open Source
        # AWS Data Lab
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/629571597/2021-07-19+to+2023-04-21+at+AWS+Data+Lab/*",
        # Accenture
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/634355716/2022-01-24+to+2023-01-27+at+Accenture+Federal+Service",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/630587394/2023-09+to+2025-10+-+Multi-Agent+Solution+Evolution",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/634781832/2022-01+to+2022-09+-+Mutual+Fund+Price+ETL+Pipeline",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/634781846/2022-04+to+2022-08+-+AWS+Cross-Cloud+Data+Synchronization+Solution",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/634749007/2022-07+to+2022-10+-+Mutual+Fund+Asset+Management+System+Login+Log+Auditing+Data+Pipeline",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/634749021/2022-10+to+2023-01+-+AWS+Glue+ETL+Job+for+Fraud+Detection+Feature+Engineering",
        # Sound Exchange
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/634355754/2022-05-02+to+2024-03-08+at+SoundExchange",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/634749035/2022-05+to+2022-12+Third-Party+Data+Entity+Resolution",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/634749049/2023-01+to+2024-03+Third-Party+Data+Ingestion+Platform",
        # EDF Energy
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/634454051/2023-03-27+to+2023-12-29+at+EDF+Energy",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/634716226/2023-03+to+2023-12+Dynamic+KPI+Engine+-+Data+Architecture+Engineering",
        # Pepsico
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/634749063/2023-06+to+2023-12+Cross-Cloud+Data+Pipeline+Project",
        # Travelers
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/629440574/2023-09+to+2024-06+-+Enterprise+AI+Observability+Platform",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/629538817/2024-06+to+2025-01+-+Enterprise+Knowledge+Integration+System",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/630685698/2024-11+to+2025-10+-+Enterprise+MCP+Infrastructure",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/630587394/2023-09+to+2025-10+-+Multi-Agent+Solution+Evolution",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/629440574/2023-09+to+2024-06+-+Enterprise+AI+Observability+Platform",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/630685698/2024-11+to+2025-10+-+Enterprise+MCP+Infrastructure",
        # Thrivent Finance
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/634781860/2024-04+to+2024-12+DynamoDB+Data+Lake+Solution",
        # Arch Systems
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/630718465/2024-08+to+2024-12+-+AI+Transformation+Consulting+Framework",
        # Collegeboard
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/634388795/2025-01-06+to+2025-12-31+at+Collegeboard",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/634716240/2025-01+to+2025-09+Modernized+Student+Search+Service+MSSS+-+OpenSearch+Migration+Project",
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/634781874/2025-09+to+2025-12+Business+Intelligence+AI+Agent+-+Production-Grade+Text-to-SQL+System",
    ],
    exclude=[
        "https://sanhehu.atlassian.net/wiki/spaces/HSH/pages/629571597/2021-07-19+to+2023-04-21+at+AWS+Data+Lab",
    ],
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
