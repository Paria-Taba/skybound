# SKYBOUND theme audio

## Active bird recording
- Creator: syncopika
- Title: Bird chirping sounds
- Source: https://opengameart.org/content/bird-chirping-sounds
- Download: https://opengameart.org/sites/default/files/birdchirping071414.wav
- License: CC0 1.0, https://creativecommons.org/publicdomain/zero/1.0/
- Local asset: assets/bird-chirps.wav
- Playback changes: loudness matching, soft fade-in/out, high-pass and low-pass filtering, occasional short playback rather than a continuous ambience bed.

## Retired forest ambience (not played)
- Creator/uploader: TinyWorlds
- Source: https://opengameart.org/content/forest-ambience
- Original download: https://opengameart.org/sites/default/files/Forest_Ambience.mp3
- License: CC0 1.0, https://creativecommons.org/publicdomain/zero/1.0/
- Local asset: assets/forest-ambience.mp3

## Stream Sounds
- Creator/uploader: kurt
- Source: https://opengameart.org/content/stream-sounds
- Original download: https://opengameart.org/sites/default/files/stream-waterfall_0.ogg
- License: Creative Commons Attribution 3.0, https://creativecommons.org/licenses/by/3.0/
- Local asset: assets/stream-waterfall.ogg
- Changes: playback level reduction, filtering and short loop-boundary fades.

Active recordings are bundled locally. No third-party requests are made during playback. The old forest recording is no longer imported or played; there is no wind recording or wind/noise generator in the active mixer.

Eight profiles correspond to the eight source worlds: forest birds/stream; quiet sandstone resonance; harbor water/birds; autumn birds/warm notes; distant water/low notes; ice droplets; sparse celestial notes; sanctuary water/soft harp. Instrumental notes are synthesized sound-design placeholders, not recordings of physical instruments. Storm water is a softened water layer, not a thunder or wind sample.

Ambience continues into gameplay and changes with the landscape recipe. Old/new profiles crossfade. All playback is filtered, recording levels are matched, output is compressed gently, default volume is conservative, and a saved volume slider and mute controls are provided. Pause and hidden tabs mute the ambience. There is no loud thunder, continuous oscillator drone or piercing bell layer.

## Continuity fix
Every theme now includes a 24-second synthesized instrumental bed, including themes without water or birds. Note tails wrap over the buffer boundary. Water recordings use overlapping playback sources instead of a single loop with a silent fade seam. Menu and game components no longer disable the shared mixer during navigation. The Settings sound-preview selector lets players audition every base world.

Tests: `node src/menu/ambience-bed.test.mjs` checks all eight beds for silent half-second gaps, peak limits and smooth boundaries. `node src/menu/audio-runtime.test.mjs` checks continuous sources, theme changes, retained playback state, pause, mute and volume with a mocked Web Audio graph. Browser checks cover theme selection and the menu-to-game transition; loudness preference still depends on the listener and device.
