# Hero video

`hero.mp4` exists and is wired up in `components/Hero.js`. It's real filmed
footage of a Zambezi sunrise boat cruise — supplied by the client
(`herosection.mp4`, ~15.8MB source). The source clip was a finished
promotional video for a different operator (Shearwater Victoria Falls),
with their logo and marketing text ("BOAT CRUISE", "BOOK YOUR CRUISE
TODAY!", etc.) burned into several segments. Per the client's instruction,
every segment carrying that branding was cut out; what remains is two clean
stretches of unbranded cruise footage (guests on the boat deck, the boat
under way at sunrise, elephants and a hippo on the riverbank) joined with a
1-second crossfade — 49 seconds total, no logos or on-screen text. Re-scaled
from the source's native 832x464 to 1280x720 with a light unsharp pass since
the source was lower-resolution than ideal for full-bleed display.

H.264, 1280x720, ~7.9MB, no audio track (the `<video>` tag is
`muted loop playsInline`, so silence is expected and required for autoplay
to work in browsers; the source's audio track — likely also the other
operator's narration/music — was stripped along with the branded video
segments).

If the client sends further real Muto Tours footage later, or a version of
this same clip without the burned-in branding, either can simply replace
this file — `Hero.js` doesn't need any code changes, it already falls back
to a photo slideshow while the video loads and swaps over via `onCanPlay`.

## If a real brand film gets shot later

Just replace this file with the finished edit — `Hero.js` doesn't need any
code changes, it already falls back to a photo slideshow while the video
loads and swaps over via `onCanPlay`. Keep to the same spec:

- H.264, 1920x1080 minimum (4K source graded down is fine), 15–25 seconds
- Muted/no audio track needed
- Under ~8MB if at all possible — this is the single biggest lever on
  homepage load time
- Optional: add `hero.webm` (VP9) for smaller file size on supporting
  browsers — add a second `<source>` line above the mp4 one in `Hero.js`
- Optional: a mobile-specific cut at `hero-mobile.mp4`, wired in with a
  `<source media="(max-width: 768px)">` if the desktop edit doesn't read
  well cropped to a portrait frame

### Edit structure (from the original creative brief, for a future real shoot)

One continuous emotional arc, not a clip reel:

1. **Arrival** — aerial/drone over the Zambezi or the Namib, establishing
   scale.
2. **Discovery** — a game drive vehicle on track, first wildlife sighting.
3. **Adventure** — Victoria Falls spray, a mokoro on the Okavango, dune
   climb.
4. **Culture** — boma dinner, local guide, genuine human moments (not
   staged-looking stock footage).
5. **Relaxation** — sunset river cruise, golden hour on the water.
6. **Memorable experience** — closing wide shot, sun dropping below the
   horizon, holding a beat before the loop restarts.

Cut on movement, not on a metronome — a few unhurried, cinematic holds (3–4s)
mixed with 2–3 faster cuts during the "adventure" beat. Avoid stock-footage
tells: no oversaturated color grade, no drone shots that feel identical to
every other travel ad, no visible camera crew or equipment.
