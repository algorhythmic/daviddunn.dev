**DAVID DUNN**

**Applied AI & Integration Engineer**

Santa Clara, CA \| US Citizen \| (305) 833-3909 \|
<davidalexanderdunn@gmail.com>

[daviddunn.dev](https://daviddunn.dev) \|
[github.com/algorhythmic](https://github.com/algorhythmic) \|
[linkedin.com/in/mrdaviddunn](https://linkedin.com/in/mrdaviddunn)

**SUMMARY**

Applied AI & Integration Engineer, 7+ years across data engineering, BI,
and LLM-powered systems. Builds AI systems that plan, execute, review,
and fix their own work, with a person approving what actually ships.
Recent work: MCP servers and guarded computer use, budgeted retrieval
with evaluation harnesses, multi-agent orchestration with human review
gates, and voice-first RAG.

**TECHNICAL PROJECTS**

[**Heimdall**](https://github.com/algorhythmic/heimdall) ·
[**Braid**](https://github.com/algorhythmic/braid) · [**Wayland Computer
Use**](https://github.com/algorhythmic/wayland-computer-use) —
**Local-First Agent Runtime** Go · Python · C · SQLite · MCP ·
Linux/Windows CI

- Built two MCP servers and an agent skill for guarded desktop control
  and observation (per-step focus/identity rechecks, failure-surviving
  execution ledger, accessibility-tree evidence); 27/27 paired E2E
  desktop tasks passed, batching cut median task time 37–47%, and change
  detection ran 2.58× faster with 99.8% smaller responses vs. screenshot
  polling; 167 tests.

- Built Braid, explainable budget-bounded retrieval fusing BM25,
  embeddings, graph PageRank, and recency, with an eval harness (grid
  search, no-answer cases, forbidden-result and budget gates); cut warm
  p50 query latency 19–41× at 2K–20K records.

- Built Heimdall, a Go task-continuity system for long-running
  human–agent work: event-sourced task state with replay, an MCP server
  with scoped credentials and explicit write grants, evidence-based
  completion checks, and reviewed state recovery; 293 tests.

[**Saga**](https://daviddunn.dev/projects#saga) — **Multi-Agent
Orchestration System** Docker · MQTT · Gitea · Claude Code · Telegram ·
Proxmox

- Runs parallel Claude Code workers in sandboxed containers (no API
  keys, no host access) against Telegram spec intake, with critic review
  of each plan before code runs and self-healing PR loops.

- Human gates at every launch and merge: the system proposes, a person
  approves; agent roles, message-passing protocols, and review artifacts
  codified into reusable deployment patterns.

[**dbriefly**](https://dbriefly.daviddunn.dev) — **Voice-First AI Audio
Briefing Service** Python · FastAPI · Postgres/pgvector · Next.js ·
Claude · OpenAI

- Built an end-to-end audio pipeline (Whisper ASR, pgvector embeddings,
  cross-source entity clustering, plan-and-execute LLM synthesis)
  turning 80+ podcasts, channels, newsletters, and forums into a daily
  5–10 min brief with inline source clips at ~\$0.03/brief.

- Shipped a realtime voice agent (OpenAI Realtime, ~500 ms budget)
  across web, Telegram, WhatsApp, SMS, and email on Postgres-only job
  orchestration, a per-call cost ledger, and a self-healing ops loop
  (automated critics + coding-agent fixes); ~700 integration tests.

[**Nexus**](https://daviddunn.dev/projects#nexus) — **Real-Time
Prediction Market Intelligence** Python · WebSockets · DuckDB · Claude ·
Convex · React

- Ingested 100K+ Kalshi/Polymarket events over 72h+ continuous runs
  (WebSocket streaming, integrity validation), surfaced through
  [marketfinder](https://marketfinder.daviddunn.dev), a live dashboard
  of 10K+ markets with anomaly alerts and trend clusters.

- Claude-powered semantic clustering, sliding-window anomaly detection,
  and cross-market correlation; pre-filtered 161M cross-platform pairs
  to ~1K before any LLM call (99.99% cost reduction); 158-test eval
  suite across 17 modules.

*Also:* [**Skald**](https://github.com/algorhythmic/skald) — Claude
Code/Codex transcript archive (Go) ·
[**steam-mcp**](https://github.com/algorhythmic/steam-mcp) — open-source
Steam Web API MCP server (TypeScript)

**PROFESSIONAL EXPERIENCE**

**Applied AI & Integration Engineer** \| Dunn & Done Systems
(independent) \| Santa Clara, CA **10/2024 – Present**

- Scoped and delivered [Happily.love](https://happily.love) end-to-end
  for a matchmaking client: Claude-assisted onboarding interviews,
  invite-based applicant flow, structured profile model, approval
  workflows, and a private matchmaker dashboard for searchable profiles.

- Built reusable Python/Airflow ELT workflows for SMB clients,
  normalizing CRM, payment, ad, and accounting data into Redshift/dbt
  models with LLM-assisted metric validation and Metabase
  revenue/churn/LTV reporting; cut reporting effort 75%.

**Analytics Engineer** \| Front Row \| Remote **10/2022 – 09/2024**

- Authored modular dbt models and Looker/Metabase explores answering 80%
  of recurring product-marketing questions, cutting ad-hoc requests 60%;
  owned metric definitions and quality rules.

- Built an experimentation pipeline (GTM, feature flags, dbt, Python
  uplift analysis) supporting 20+ A/B tests and dynamic-pricing tactics
  that lifted average purchase price 8%.

**Marketing Data Analyst** \| ORComm \| Seoul, South Korea **01/2020 –
08/2022**

- Built reusable marketing dashboards and cohort/funnel/retention
  analyses for 10 seed-stage consumer startups, standardizing CAC, ROAS,
  and retention metrics across client reporting; reduced recurring
  report build time 60%.

**Business Intelligence Analyst** \| VR Comet \| Seoul, South Korea
**12/2018 – 12/2019**

- Transformed Google Analytics, HubSpot, and Unity event data in
  Redshift into reusable SQL views and reports for retention,
  monetization, and acquisition analysis, identifying growth
  opportunities tied to 15% MoM DAU growth.

**TECHNICAL SKILLS**

**Applied AI & LLMs:** Claude API, Claude Code (skills, plugins, hooks),
OpenAI, Vertex AI, MCP servers (TS/Python/Go), hybrid RAG

**Evals & Observability:** eval harnesses, offline benchmarks,
human-in-the-loop gates, cost ledgers, tracing, Grafana

**Integration & Automation:** FastAPI, Pydantic, Airflow, WebSockets,
MQTT, event-driven systems, Docker, CI/CD, Playwright, Git, Linux

**Languages & Data:** Python, Go, TypeScript, SQL, dbt, Kafka, Spark,
DuckDB, PostgreSQL, Snowflake, Redshift, BigQuery

**Analytics, ML & BI:** anomaly detection, A/B testing, forecasting,
scikit-learn, statsmodels, Metabase, Looker, Tableau, Streamlit

**EDUCATION**

B.S. Physics, Lake Forest College (2009)
