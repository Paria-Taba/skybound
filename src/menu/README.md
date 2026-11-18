# SKYBOUND — The Verdant Ruins main menu

The existing React/JavaScript game is preserved. This implementation does not require Unity.

## Modules
- `MainMenu.jsx`: responsive menu, reusable button/dialog components, profile, cosmetic and atmosphere selection, local earned-currency shop, score panel, challenge preview and settings.
- `MenuScene.jsx`: stable entry point to the redesigned scene.
- `CinematicScene.jsx`: procedural weathered islands, exposed roots, stone arches, distant watchtowers, forests, animated waterfalls, cloud banks, fog, warm directional sunlight, soft shadow maps and restrained light shafts. Responsive three-quarter camera with subtle parallax.
- `Nori.jsx`: original non-humanoid woodland spirit, with a seed body, moss mantle, bark mask, root paws, leaf crest, amber eyes, breathing, blinking and head/leaf animation. Natural palette replaces legacy candy colors. Silverleaf crest preserves ownership and wallet keys from the previous cosmetic.
- `audio.js`: synthesized hover/click cues and optional `music`, `hover`, `click` asset URLs. Add licensed audio URLs to `audioAssets`.
- `menu.css`: retained layout/component base.
- `cinematic.css`: forest/brass art direction, editorial serif logo, restrained navigation, dark stone panels, responsive layouts and fade transition. Uses Cormorant Garamond with a local Georgia fallback. An inline SVG noise layer adds subtle interface texture.

## Run
From the project directory: `npm install` (first time), then `npm run dev`. Open the printed localhost URL. `npm run build` generates `dist`.

## Test
1. At desktop and portrait widths, check all seven menu actions and profile/currency visibility.
2. Open Characters and select a mantle: NORI changes immediately; reload to check persistence.
3. Select a world: menu atmosphere changes; gameplay worlds are explicitly not yet connected.
4. Open Settings: toggle UI sound, music placeholder and reduced UI motion; reload to verify persistence.
5. Tab through buttons; check dialog focus trap, Escape dismissal and focus restoration.
6. Play: cloud transition leads to gameplay. Test A/D, Space, Shift, P/Escape and touch controls.
7. Pause or lose, return to main menu, check saved best, completed run count and earned crystal wallet.
8. Shop: insufficient balance gives feedback; 250 earned crystals unlocks Silverleaf. No payment endpoint exists.

## Limits
No external 3D assets are required: the environment and NORI are generated from geometry. Bespoke sculpted models, authored PBR texture maps, licensed music, online profiles/rankings, scheduled daily resets, real premium currency and gameplay world variants are not provided. Light shafts and contact shading are lightweight artistic approximations, not ray-marched volumetrics or screen-space ambient occlusion. Gameplay mechanics and its scene remain unchanged. Real-device performance and accessibility testing remain necessary before commercial release.
