# Video publishing

Videos are plain MP4 files in `public/video/`, played with the browser's native
`<video>` element. No streaming service or player library is used.

| Video | Where | Indexed | Status |
| --- | --- | --- | --- |
| Agent runtime explainer (~3 min) | `/projects#runtime` | Yes | Not recorded |
| Unlisted intros (~30 s each) | `/v/<slug>` | No | Not recorded |

Nothing renders until the files exist. Do not add links, players or posters
that point at files you have not added.

## 1. Encode (local, ffmpeg)

1080p H.264 + AAC with the `moov` atom at the front (`+faststart`) so playback
starts before the download finishes:

```bash
ffmpeg -i raw.mov \
  -vf "scale=-2:1080" \
  -c:v libx264 -profile:v high -preset slow -crf 22 -pix_fmt yuv420p \
  -c:a aac -b:a 128k -ar 48000 -ac 2 \
  -movflags +faststart \
  explainer-1080p.mp4

ffmpeg -ss 2 -i explainer-1080p.mp4 -frames:v 1 -q:v 2 explainer-poster.jpg
```

### Intros: VTT and burned-in captions

Recruiters often watch muted, so intros get captions burned into the picture
and a WebVTT file for screen readers and caption toggles.

1. Write the transcript as `captions.vtt`:

   ```
   WEBVTT

   00:00:00.000 --> 00:00:03.500
   Hi, I'm David Dunn.
   ```

2. Pick the asset basename. It must start with `intro-` and end in a random
   token (8+ characters, at least one digit), so the file URL is as hard to
   guess as the page URL:

   ```bash
   FILE="intro-fde-$(openssl rand -hex 6)"   # e.g. intro-fde-<12 hex chars>
   ```

3. Encode with the captions burned in (needs ffmpeg built with libass), copy
   the VTT unchanged, and grab a poster:

   ```bash
   ffmpeg -i raw.mov \
     -vf "scale=-2:1080,subtitles=captions.vtt:force_style='FontName=Inter,FontSize=22,Outline=2,MarginV=40'" \
     -c:v libx264 -profile:v high -preset slow -crf 22 -pix_fmt yuv420p \
     -c:a aac -b:a 128k -ar 48000 -ac 2 \
     -movflags +faststart \
     "public/video/$FILE.mp4"
   cp captions.vtt "public/video/$FILE.vtt"
   ffmpeg -ss 1 -i "public/video/$FILE.mp4" -frames:v 1 -q:v 2 "public/video/$FILE.jpg"
   ```

4. Verify codecs and faststart (`moov` must be listed before `mdat`):

   ```bash
   ffprobe -v error -show_entries stream=codec_name,width,height -of compact "public/video/$FILE.mp4"
   ffprobe -v trace "public/video/$FILE.mp4" 2>&1 | grep -m2 -oE "type:'(moov|mdat)'"
   ```

Check file sizes against your host's static-file limits; a 30-second 1080p
intro at CRF 22 is typically a few MB.

## 2. Publish an unlisted intro

"Unlisted" means hidden from search, the sitemap and navigation; anyone with
the link can watch. That is the intended level for a recruiter link.

1. Generate a slug with a random token of at least 8 characters including a
   digit (12 hex characters recommended; rerun in the rare case it has no
   digit). Never use a company, person or example slug:

   ```bash
   echo "$(openssl rand -hex 6)"
   ```

2. Add an entry to `INTRO_VIDEOS` in `lib/intro-videos.ts`:

   ```ts
   {
     slug: "<generated slug>",
     role: "Forward Deployed Engineer",
     file: "<value of $FILE>",
     ready: true,
     burnedInCaptions: true,
     expiresAt: "2027-01-31T23:59:59-08:00", // optional
   }
   ```

   Do not commit an entry before its three files exist.

3. Build. `generateStaticParams` publishes an entry only if it passes
   validation (slug and file token rules, no example slugs), `ready` is true,
   it has not expired, and `<file>.mp4`, `.vtt` and `.jpg` exist in
   `public/video/`. Anything else returns 404 and logs an `[intro-videos]`
   warning during the build. Unknown slugs always return 404.

What keeps it unlisted:

- Page metadata: `robots: { index: false, follow: false }` plus
  `referrer: same-origin` so the URL is not sent to other sites.
- `next.config.mjs` headers: `X-Robots-Tag: noindex, nofollow, noarchive` on
  `/v/*` and `/video/intro-*`.
- `app/sitemap.ts` lists only `/` and `/projects`.
- No navigation links. Do not create a `robots.txt` entry for `/v/`; that file
  is public and would point straight at the pages.

If Cloudflare or another proxy fronts the site, confirm it passes the
`X-Robots-Tag` header through, or add an equivalent response-header rule.

## 3. Check after deploying (logged out / private window)

```bash
curl -sI  https://daviddunn.dev/v/<slug> | grep -iE "^(HTTP|x-robots-tag)"
curl -s   https://daviddunn.dev/v/<slug> | grep -o '<meta name="robots"[^>]*>'
curl -sI  https://daviddunn.dev/video/<file>.mp4 | grep -iE "^(HTTP|x-robots-tag|content-type)"
curl -sI  https://daviddunn.dev/v/notarealslug1 | head -1          # expect 404
curl -s   https://daviddunn.dev/sitemap.xml | grep -c "/v/"        # expect 0
```

Then open the link on a phone with the sound off: the poster shows, captions
are visible, and the three buttons (résumé PDF, `/projects#runtime`, email)
work.

## 4. Retire an intro

Set `expiresAt` for retirement on the next successful regeneration. The hourly
`revalidate` interval is not a strict cutoff: regeneration is request-triggered
and a visitor can receive the stale page first ([Next.js ISR behavior](https://nextjs.org/docs/app/guides/incremental-static-regeneration)).
For a definite retirement, remove the entry and redeploy, then verify the response
and clear any separately configured CDN cache. The page going 404 does not remove the files:
delete `public/video/<file>.*` as well, since static files stay reachable.

## 5. Public explainer (later)

Not wired up yet, by design: no player or link exists until the video does.
The former “runtime — how the parts connect” diagram has been removed from
the card. Its position after the Heimdall and Skald screenshots is reserved
for this explainer; keep that space collapsed until the assets are ready.
When `explainer-1080p.mp4`, `explainer.vtt` and `explainer-poster.jpg` are in
`public/video/`:

- Embed it after the screenshots in the runtime card (`/projects#runtime`) with
  `<video controls playsInline preload="metadata" poster="/video/explainer-poster.jpg">`,
  a `<source type="video/mp4">` and `<track kind="captions" srcLang="en" default>`.
  No autoplay with sound.
- It is public and indexable; the `intro-*` noindex header does not match it.
- Then link it from the Heimdall and Wayland Computer Use READMEs and the
  GitHub profile README.
