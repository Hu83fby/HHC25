import * as THREE from 'three';

// ------------------------------------------------------------
// SHARED ULTRA-LIGHT SNOWFLAKE TEXTURE
// ------------------------------------------------------------
let cachedTexture = null;

function createSnowflakeTexture() {
  if (cachedTexture) return cachedTexture;

  const size = 32;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  cachedTexture = texture;
  return texture;
}

// ------------------------------------------------------------
// CREATE A SINGLE SNOW LAYER (with shimmer phases)
// ------------------------------------------------------------
function createSnowLayer({ count, spread, size, speed }) {
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const base = i * 3;
    positions[base + 0] = (Math.random() - 0.5) * spread * 2;
    positions[base + 1] = Math.random() * spread * 2;
    positions[base + 2] = (Math.random() - 0.5) * spread * 2;
    phases[i] = Math.random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

  const material = new THREE.PointsMaterial({
    size,
    map: createSnowflakeTexture(),
    transparent: true,
    opacity: 1.0,
    depthWrite: false,
    blending: THREE.NormalBlending,
    sizeAttenuation: true
  });

  const points = new THREE.Points(geometry, material);

  return { points, geometry, positions, phases, count, spread, speed, material };
}

// ------------------------------------------------------------
// MAIN SNOWFALL SYSTEM (3 LAYERS + shimmer)
// ------------------------------------------------------------
let layers = [];

export function addSnowfall(scene) {
  const foreground = createSnowLayer({ count: 300, spread: 10, size: 0.14, speed: 0.05 });
  const midground = createSnowLayer({ count: 1000, spread: 14, size: 0.12, speed: 0.03 });
  const background = createSnowLayer({ count: 1700, spread: 18, size: 0.09, speed: 0.02 });

  layers = [foreground, midground, background];
  layers.forEach(layer => scene.add(layer.points));
}

// ------------------------------------------------------------
// EXTERNAL UPDATE FUNCTION (called from main.js)
// ------------------------------------------------------------
export function updateSnowfall(delta, t) {
  for (const layer of layers) {
    const { positions, phases, geometry, count, spread, speed, material } = layer;

    for (let i = 0; i < count; i++) {
      const base = i * 3;
      const yIndex = base + 1;

      positions[yIndex] -= speed * delta * 60;
      positions[base + 0] += Math.sin(t + phases[i]) * 0.0025;
      material.opacity = 0.85 + Math.sin(t * 3.5 + phases[i]) * 0.25;

      if (positions[yIndex] < -2) {
        positions[yIndex] = Math.random() * spread + 2;
        positions[base + 0] = (Math.random() - 0.5) * spread * 2;
        positions[base + 2] = (Math.random() - 0.5) * spread * 2;
      }
    }

    geometry.attributes.position.needsUpdate = true;
  }
}
