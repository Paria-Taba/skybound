# Main-menu 3D photo relief

The approved main-menu artwork remains the full-resolution color texture. `MenuDepthScene.jsx` projects it onto a subdivided Three.js surface displaced by `assets/sanctuary-depth.png`. Foreground leaves, the stone platform, NORI and distant islands occupy different depths. A limited, smoothed pointer/touch camera movement produces parallax without replacing the illustration with low-detail models.

This is a depth-mapped photographic relief (a 2.5D presentation), not a reconstructed scene of fully modeled objects. It supports only small camera movements. It cannot reveal unseen sides of NORI or the architecture, and large camera rotations would stretch silhouette boundaries. Character-angle inspection remains the six-view reference viewer.

The depth asset was generated with built-in ImageGen using the approved sanctuary image as the edit reference. Prompt: preserve exact composition and silhouettes; output a grayscale depth map with white nearest and black farthest, low-frequency depth gradients inside objects, foreground platform/leaves near white, NORI light gray, distant islands dark gray and sky near black; no color, text or surface lighting texture.

`image-relief.mjs` computes desktop/mobile cover framing and projection compensation. The neutral camera preserves original image alignment. The color texture uses its original pixel dimensions, sRGB handling and anisotropic filtering. No blur filter is applied. The underlying original image stays available while the renderer loads and if WebGL fails. Actual device performance still requires broader mobile testing.

Settings contains a saved **3D menu depth** switch for comparison with the original image. Reduced-motion preferences center the camera. Opening a menu panel centers the camera as well. Pointer movement over the page controls depth; dragging over NORI moves the view without opening character inspection, while a normal tap/click still opens it.

Validation: `node src/menu/image-relief.test.mjs` verifies viewport coverage and neutral-camera projection at multiple depths. The production build passes. Browser inspection verified shader compilation without errors, original/depth mode switching, image rendering and pointer-driven parallax.
