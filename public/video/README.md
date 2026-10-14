# public/video

Self-hosted video files for daviddunn.dev. This directory is empty apart from
this note: no videos have been published yet.

Everything in `public/` is served as-is, including this file, so never put
slugs, drafts or unpublished cuts here.

Expected files, once recorded and encoded:

- Public explainer: `explainer-1080p.mp4`, `explainer.vtt`, `explainer-poster.jpg`.
  Indexable; shown on the projects page only after the files exist.
- Unlisted intros: `intro-<role>-<random token>.mp4`, `.vtt` and `.jpg` (same
  basename). Served with `X-Robots-Tag: noindex` and published only through
  `lib/intro-videos.ts`.

Encoding, captions, slugs and checks: `docs/VIDEO-PUBLISHING.md`.
