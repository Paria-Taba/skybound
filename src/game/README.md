# NORI's Ascent — gameplay

## Running and checking

Run `npm run dev` from the project folder, then open the printed localhost URL. Build with `npm run build`.

```bash
node src/game/engine.test.mjs
node src/game/animation.test.mjs
node src/game/realms.test.mjs
node src/game/wall-layout.test.mjs
```

## Clock-based endless worlds

Every complete 30-second lap of active game time increases scrolling speed and advances the world. Height is only a score/progression measurement; it does not change backgrounds. Pausing freezes the simulation clock. Retry resets the run and world index.

The first eight laps introduce eight distinct original environments. Starting with world 9, twelve new environment families use original full-resolution paintings: underwater coral palaces, clockwork city, volcanoes, ice cathedral, desert colossi, world tree, lunar ruins, crystals, bamboo temples, tidal ruins, luminous mushrooms and airships. Each twelve-world journey shuffles the families; adjacent worlds never share a family. Seeded landmarks and terrain create new layouts without a final-world cap. Each family has its own 1536x1024 painted background. Later visits vary framing, weather, particles and subtle procedural silhouettes while preserving sharp image rendering. Families recur, but the original eight images are no longer recycled after world 8. Open `/realm-preview.html` on the dev server to inspect any world directly.

`EndlessBackground.jsx` renders independent 1536x1024 images, keeps at most two layers during a transition, and preloads the next image. See `REALM-ART.md` for image-generation details and quality limits. `sb-progress` stores the longest completed run and highest world for the WORLDS discovery panel.

## Movement

A/D or arrows move; Space/Up jumps; Shift air-dashes; P/Escape pauses. Mobile has touch controls. A wall jump launches NORI higher and faster with a spin. The same wall stays locked until landing or using the opposite wall. A brief departure from a wall does not recharge it.

The screen's lower edge rises at `0.35 + 0.12 * completedClockLaps` meters per second. No gray floor or horizontal danger plane is rendered. The camera follows this rising boundary. Platforms are generated in bounded quantities ahead of the climb; center platforms bridge the wall-side routes.

## Character animation and effects

`AnimatedNori.jsx` renders the approved character's 24-frame transparent atlas in the 3D scene. `animation.mjs` selects idle, walk, run, aerial tuck and recovery frames using movement distance, vertical velocity and spin progress. UVs have sampling margins, left movement mirrors the artwork, and walking feet use aligned baselines. This is a camera-facing animated sprite, not a rigged 3D character.

The atlas was generated using built-in ImageGen: a uniform 6-column, 4-row sheet matching the approved NORI design, with six idle, six walk, six run and six aerial action poses, consistent scale and right-facing camera, no labels or environment. A second pass removed the background; alpha and cell layout were inspected with `inspect-atlas.mjs`.

Each wall spin triggers theme-colored stars and a praise word. The shuffled word bag avoids consecutive repeats. Effects pause with the game and respect reduced-motion preferences.

## Validation and limits

Tests cover clock boundaries, height-independent world changes, 1,000 distinct deterministic scenery recipes, long climbs, collisions, wall-boost restrictions, wall color continuity, animation selection and atlas UV bounds. Real-device performance and final gameplay balance still need playtesting before commercial release.

Platform challenge now increases with elapsed run time and climb height. Newly generated platforms narrow gradually from 2.6 to a minimum of 1.3 units, and fragile density increases. Every fourth platform remains a stable anchor. Existing footholds keep their size and type; the starting floor remains wide. Fragile platforms also crumble when revisited below the highest previously landed platform. Run platform-difficulty.test.mjs for progression and stability checks.
