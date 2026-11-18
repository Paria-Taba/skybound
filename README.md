# SKYBOUND — Project Guide

SKYBOUND is a browser-based vertical arcade platformer. Players control NORI, jump between platforms, perform spinning wall jumps, collect crystals, and stay ahead of the rising bottom edge of the screen.

This version is built with **JavaScript and React**. It is not a Unity project, and standalone Windows executables and app-store-ready mobile builds are not included.

## Languages, Tools, and Libraries

| Name | Type | Purpose in this project |
| --- | --- | --- |
| JavaScript | Programming language | Game logic, movement, collisions, scoring, progression, and animation |
| JSX | JavaScript syntax extension | React components and declarative 3D scenes |
| HTML | Page structure | Browser entry page |
| CSS | Interface styling | Menus, desktop/mobile layouts, transitions, and star effects |
| React 19 | UI library | Main menu, panels, settings, scores, and state management |
| React DOM 19 | Rendering library | Rendering React components in the browser |
| Three.js 0.181 | 3D graphics library | Platforms, walls, camera, lighting, materials, and character rendering |
| React Three Fiber 9 | React renderer for Three.js | Defining and updating the 3D scene using components |
| Vite 6 | Development and build tool | Local development server and production output in `dist` |
| Node.js | Development runtime | Running Vite and game-logic tests; not a game backend |
| npm | Package manager | Installing dependencies and running project commands |
| WebGL | Browser graphics technology | Rendering the 3D scene through Three.js |
| Web Audio API | Browser audio interface | Nature ambience, interface sounds, and soft musical notes |
| localStorage | Browser storage | Local records, settings, profile, and currency balance |
| SVG | Vector graphics | Clock, stars, and background image regions |
| OpenAI ImageGen | AI image-generation tool | NORI artwork, animation atlas, and game backgrounds |

The version numbers above describe the dependency families declared in `package.json`. Exact installed versions are recorded in `package-lock.json`. To inspect them, run:

```bash
npm list --depth=0
```

## Artwork and Character Animation

- The main-menu background and eight independent 1536x1024 gameplay environments are AI-generated images. Later environments combine these base images with generated atmosphere and island arrangements.
- Platforms and walls are built from 3D geometry in code.
- NORI uses a **24-frame sprite atlas** containing idle, walk, run, and aerial tuck/recovery poses.
- The character artwork is rendered on a transparent camera-facing plane inside the 3D scene. NORI is not yet a rigged 3D model.
- The character-angle viewer displays six reference pictures rather than a freely rotating 3D model.

## Audio and Licenses

Active bird chirps are by syncopika under CC0, and the water recording is by kurt under CC BY 3.0. The older forest ambience is no longer played. Each landscape has a gentle audio profile, with no wind layer, smooth crossfades, pause/mute support and a saved ambient-volume slider. Sources, license links, and playback modifications are documented in [AUDIO-CREDITS.md](src/menu/AUDIO-CREDITS.md). Soft musical notes and interface cues are generated in code.

## Running the Game

Install Node.js and npm first, then open a terminal in the project folder.

Install dependencies on the first run:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL printed in the terminal, usually `http://localhost:5173/`. Keep the terminal open while playing. Vite may select another port if the default port is occupied.

Create a production build:

```bash
npm run build
```

The output is written to `dist`. Serve that folder through a web server or static hosting service; opening its HTML file directly by double-clicking is not the recommended way to run the game.

## Controls and Current Rules

| Input | Action |
| --- | --- |
| A / D or left/right arrows | Move |
| Space or up arrow | Jump |
| Space while touching a wall | Faster, higher jump with a spin |
| Shift | Air dash; recharges on landing |
| P / Escape | Pause or resume |
| On-screen touch buttons | Mobile controls |

- Repeated spinning jumps from the same wall are blocked. Landing on a platform or jumping from the opposite wall allows another wall boost.
- Every full 30-second clock lap changes the environment. After the first eight worlds, generated combinations continue without a final-world cap. Height does not trigger environment changes.
- Each clock lap lasts 30 seconds of active play and increases upward scrolling speed. Pausing freezes the clock.
- A wall spin triggers theme-colored star rain and an English praise word.
- Restarting resets the current run, clock, and progression.

## Project Structure

```text
src/
  main.jsx                  Application entry and menu/game integration
  menu/                     Menu UI, character viewer, and audio system
  game/
    Game.jsx                Scene, input, camera, and gameplay HUD
    engine.mjs              Movement, collisions, wall jumps, and difficulty
    AnimatedNori.jsx         Character animation rendering
    animation.mjs           Animation state and frame selection
    SpinCelebration.jsx     Wall-spin stars and praise display
    praise.mjs              Praise selection without consecutive repeats
    assets/                 Images and animation atlas
```

## Running Tests

```bash
node src/game/engine.test.mjs
node src/game/animation.test.mjs
node src/game/realms.test.mjs
node src/game/wall-layout.test.mjs
node src/menu/audio-profiles.test.mjs
node src/menu/audio-runtime.test.mjs
```

The tests cover jumping, wall boosts, repeated-wall-jump restrictions, difficulty progression, realm changes, and animation-frame selection.

## Current Status

This is a playable project under development. Keyboard and touch controls are implemented, but commercial release still requires real-device testing and further art and animation polish. Online accounts, remote leaderboards, real-money payments, a backend, and app-store builds are not implemented. Saved data belongs to the current browser only.
