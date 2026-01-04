// gift.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let giftModel = null;

// -----------------------------------------------------
// Load the base GLB once (cached)
// -----------------------------------------------------
export async function loadGiftModel() {
  if (giftModel) return giftModel;

  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync('models/gift.glb');

  giftModel = gltf.scene;

  giftModel.traverse(obj => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  return giftModel;
}

// -----------------------------------------------------
// Expanded festive palette + distinct color helper
// -----------------------------------------------------
function randomDistinctColor(excludeColor = null) {
  const palette = [
    '#ff4d4d', // red
    '#4da6ff', // blue
    '#ffd24d', // gold
    '#7dff7d', // green
    '#ff7de9', // pink
    '#ffffff', // white
    '#ff9f4d', // orange
    '#b84dff', // purple
    '#4dffd2', // aqua
    '#d9d9d9', // silver
    '#ffe680', // soft gold
    '#ff6666', // warm red
    '#66b3ff', // sky blue
    '#99ff99', // mint
  ];

  let color = palette[Math.floor(Math.random() * palette.length)];

  // Ensure ribbon never matches present
  while (excludeColor && color === excludeColor) {
    color = palette[Math.floor(Math.random() * palette.length)];
  }

  return color;
}

// -----------------------------------------------------
// Create a single randomized gift instance
// -----------------------------------------------------
export function createGiftInstance(baseModel, options = {}) {
  const gift = baseModel.clone(true);

  let presentMat = null;
  let ribbonMat = null;

  // First pass: clone materials so each gift is unique
  gift.traverse(obj => {
    if (obj.isMesh) {
      if (obj.material.name === 'present') {
        presentMat = obj.material.clone();
      }
      if (obj.material.name === 'ribbon') {
        ribbonMat = obj.material.clone();
      }
    }
  });

  // Pick distinct colors
  const presentColor = randomDistinctColor();
  const ribbonColor = randomDistinctColor(presentColor);

  // Apply colors
  if (presentMat) presentMat.color = new THREE.Color(presentColor);
  if (ribbonMat) ribbonMat.color = new THREE.Color(ribbonColor);

  // Second pass: assign cloned materials back to meshes
  gift.traverse(obj => {
    if (obj.isMesh) {
      if (obj.material.name === 'present') obj.material = presentMat;
      if (obj.material.name === 'ribbon') obj.material = ribbonMat;
    }
  });

  // Random scale
  const scale = options.scale ?? THREE.MathUtils.randFloat(0.4, 1.2);
  gift.scale.set(scale, scale, scale);

  // Random rotation around Y
  gift.rotation.y = THREE.MathUtils.degToRad(
    options.rotation ?? THREE.MathUtils.randInt(0, 360)
  );

  // Position
  if (options.position) {
    gift.position.set(options.position.x, options.position.y, options.position.z);
  }

  return gift;
}

// -----------------------------------------------------
// Add multiple gifts to the scene
// -----------------------------------------------------
export async function addGifts(scene, positions = []) {
  const base = await loadGiftModel();

  positions.forEach(pos => {
    const gift = createGiftInstance(base, { position: pos });
    scene.add(gift);
  });
}
