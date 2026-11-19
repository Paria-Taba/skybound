# Full-resolution realm artwork

All eight gameplay backgrounds are independent 1536x1024 PNG files in `assets/realms/`. They replace the previous small atlas regions. Rendering uses the original local image at cover size; there is no blur filter on the artwork or paused gameplay background. Very large displays can still require upscaling beyond native resolution.

Generated with the built-in ImageGen tool using the earlier eight-world concept atlas as a visual reference. One separate generation was made for each scene. Prompt set: expand the selected reference world into one standalone full-resolution landscape with sharp stone/foliage, cinematic fantasy lighting, readable central sky, detailed floating islands and waterfalls, and no character, UI, text, grid or blur effect.

Worlds: Verdant Skies; Sunforged Ruins; Cloudsea Harbor; Emberwood Heights; Stormwatch Peaks; Frostbound Heights; Astral Observatory; Crown of the Sky.

`realm-assets.mjs` exports the local URLs. `EndlessBackground.jsx` keeps at most two scenery layers during a 1.8-second crossfade and preloads the next base image. Worlds after these first eight use the new expansion artwork described below.


## Endless environment expansion

Worlds 9 onward use twelve new 1536x1024 illustrated environment backgrounds in `assets/realms/expansion/`. `environment-assets.mjs` maps them to biome identities. `biomes.mjs` shuffles all twelve families per journey, avoids adjacent repeats, and generates seeded scenery details. `GeneratedWorld.jsx` supplies subtle optional distant landmarks for later visits. Original images are preserved for worlds 1-8. Families recur with new compositions; this is not unlimited unique paintings or art styles.

The backgrounds were made with the built-in image_gen tool. Exact prompts are saved in WORLD-ART-PROMPTS.json. They are used at full source resolution with no CSS blur, contact-sheet cropping, or pre-downscaling.

Preview every world at `/realm-preview.html` using the world-number input. The atlas is also a production build entry. Runtime keeps at most two scenery layers during transitions and preloads the next world.
