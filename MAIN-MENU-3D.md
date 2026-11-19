> Archived experiment: the real 3D menu was reverted at the user’s request. The active menu uses the previous approved artwork and optional depth effect.

# Real 3D main menu

Drag an empty area to orbit. Arrow buttons turn 45 degrees; FRONT resets the camera. Settings > 3D menu scene switches to the original illustration.

The foreground uses actual Three.js geometry: NORI, island, arch, roots, tree and waterfall. NORI has subtle breathing, head and tail motion. Stone and bark surface textures are AI-generated. Directional shadows and responsive camera framing are enabled.

The distant landscape is a full-resolution 2D backdrop. NORI is a procedural 3D approximation, not a production sculpt matching every reference detail. Gameplay retains its existing sprite animations. No external GLB/FBX assets are required.

## Modified and added files

- src/menu/MainMenu.jsx: integration, orbit controls and settings.
- src/menu/TrueMenuScene.jsx: camera, environment, lights and rendering.
- src/menu/NoriModel.jsx: reusable character geometry and idle animation.
- src/menu/organic-geometry.mjs: curved blades, tubes and camera positions.
- src/menu/true-menu.css: responsive canvas and controls.
- src/menu/assets/stone-surface.png and bark-surface.png: generated textures.

## Run

Run `npm install` if dependencies are missing, then `npm run dev`. Open the displayed local URL. `npm run build` validates the production bundle. WebGL is required. Reduced UI motion disables idle animation while preserving manual rotation. The former MenuDepthScene component is retained but no longer mounted.
