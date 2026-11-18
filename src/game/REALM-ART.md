# Full-resolution realm artwork

All eight gameplay backgrounds are independent 1536x1024 PNG files in `assets/realms/`. They replace the previous small atlas regions. Rendering uses the original local image at cover size; there is no blur filter on the artwork or paused gameplay background. Very large displays can still require upscaling beyond native resolution.

Generated with the built-in ImageGen tool using the earlier eight-world concept atlas as a visual reference. One separate generation was made for each scene. Prompt set: expand the selected reference world into one standalone full-resolution landscape with sharp stone/foliage, cinematic fantasy lighting, readable central sky, detailed floating islands and waterfalls, and no character, UI, text, grid or blur effect.

Worlds: Verdant Skies; Sunforged Ruins; Cloudsea Harbor; Emberwood Heights; Stormwatch Peaks; Frostbound Heights; Astral Observatory; Crown of the Sky.

`realm-assets.mjs` exports the local URLs. `EndlessBackground.jsx` keeps at most two scenery layers during a 1.8-second crossfade and preloads the next base image. Later procedural variants reuse these eight images with seeded lighting, weather, cloud and distant-island layers. They are new compositions from finite artwork, not an unlimited collection of separately authored paintings.
