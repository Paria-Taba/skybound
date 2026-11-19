# World soundscapes

All 20 environment families have dedicated profiles in audio-profiles.mjs: woodland streams, sandstone resonance, harbor water, autumn plucks, stormwatch low notes, ice droplets, celestial harmonics, sanctuary harp, underwater bubbles, clockwork ticks, lava pulses, glacial bells, desert strings, living wood, lunar glass, crystal tines, bamboo knocks, tidal temple bells, cave spores and airship timber motifs.

These are quiet synthesized environmental motifs and musical textures, combined with the previously credited bird and water recordings where suitable. They are not twenty separately recorded field tracks. No wind track is used.

A continuous 24-second stereo buffer plays independently of network loading and JavaScript scheduling. All tails wrap across the loop boundary. Nature recordings are optional: a failed or delayed download does not silence the soundscape. Water excerpts overlap with fades.

World changes use a 2.4-second constant-power crossfade. Old sources are retired using the AudioContext clock, not wall-clock timers, so a suspended tab cannot discard a transition early. Rapid changes fade from the currently audible gain. A four-entry buffer cache bounds retained audio memory.

The world atlas at /realm-preview.html has LISTEN TO THIS WORLD. Enable sound once, then use NEXT WORLD to test transitions. Main-menu Settings > Preview world sound now offers all first 20 worlds. Later generated worlds select the corresponding environment profile automatically. Browser autoplay requires an initial user interaction; mute, volume and pause controls remain available.

Validation:
- audio-transition.test.mjs checks power and interrupted fades.
- ambience-bed.test.mjs checks 20 distinct rendered buffers, loop seams, peak bounds and absence of silent half-second windows.
- audio-runtime.test.mjs checks stage mapping, startup before downloads, offline fallback, pause/mute, bounded caching and audio-clock retirement.


## Spin celebration cue

`playSpin` triggers a 0.62-second, material-themed rising boing/chime in the same gameplay handler that shows the praise text. It uses the current world profile, varies across three short phrases, respects sound/mute/volume/pause controls, caps overlapping voices and never restarts ambience. The world atlas has a TEST SPIN button after enabling sound.

Stage entry plays a 1.45-second ascending fanfare matching the destination theme. The stage transition effect tracks the last stage, so initial load, rerenders, pause and run reset do not replay it. Entry at game-over is suppressed. Listen with NEW STAGE in the world atlas after enabling sound.

Stormwatch Peaks (world 5) includes a locally synthesized continuous stereo rain layer and two soft rolling thunder events per 24-second loop, mixed into its existing theme buffer. No wind layer or extra network audio dependency is added. Weather follows the same volume, mute, pause and world-crossfade controls. Preview directly at /realm-preview.html?world=5, then enable LISTEN. Other world profiles are unchanged.

Game-over introduction: on a fatal fall, gameplay enters a noninteractive dying phase and plays a 1.5-second synthesized cartoon vowel groan with a smooth descending voice. The result dialog opens after 2000ms, after the sound finishes. Ambience remains available during the cue, then follows the normal result-screen pause. Muting/effects settings are respected; restart and unmount cancel pending result timers. Preview the sound with FALL in the world atlas.

The updated fall cue uses voiced harmonics and moving vowel formants, with a slower attack and no impact/plop. Its playback gain is 1.15 (previously 0.9), with a normalized 0.32 peak and the existing master volume/compressor.
The final fall effect now uses rubberduck's CC0 recorded creature groan, followed by a soft ground thump and dust puff at 0.95s. See FALL-SOUND-CREDITS.md. The result delay remains 2000ms.
