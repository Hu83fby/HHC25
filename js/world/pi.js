import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function addRasPi(scene, colliders) {
  const loader = new GLTFLoader();

  loader.load('./models/pi.glb', (gltf) => {
    const rasPi = gltf.scene;
    const baseScale = 1.0;
    rasPi.scale.set(baseScale, baseScale, baseScale);
    rasPi.position.set(-1, 0.1, -0.6);
    
    rasPi.userData.baseScale = baseScale;

    const activityLights = [];
    const raspberryParts = [];

    rasPi.traverse(child => {
      if (child.isMesh && child.material) {
        // Ensure we are working with an array of materials or a single one
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        
        materials.forEach(mat => {
          const name = mat.name.toLowerCase();
          
          // Setup emissive properties for all targeted mats
          mat.emissive = mat.color.clone();
          mat.emissiveIntensity = 0;

          // 1. Status Lights: Exact match only (skips dark_green)
          if (name === 'red' || name === 'yellow' || name === 'green') {
            activityLights.push(mat);
          }
          
          // 2. Hover Targets: Specific brand colors
          if (name === 'ras_pink' || name === 'ras_green') {
            raspberryParts.push(mat);
          }
        });
      }
    });

    const rasPiURL = new URL('./js/config/perf_config.md', window.location.origin).href;
    rasPi.userData.israsPi = true;
    rasPi.userData.activityLights = activityLights;
    rasPi.userData.raspberryParts = raspberryParts;

    scene.add(rasPi);

    // Collider
    const rasPiCollider = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 8, 8),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    rasPiCollider.position.copy(rasPi.position);
    rasPiCollider.userData = { israsPi: true, url: rasPiURL, rasPiRef: rasPi };

    scene.add(rasPiCollider);
    colliders.push(rasPiCollider);

    scene.userData.rasPi = { object: rasPi, baseScale, hovered: false };
  });
}

export function animateRasPi(scene, time) {
  const state = scene.userData.rasPi;
  if (!state?.object) return;

  const lights = state.object.userData.activityLights;
  if (!lights) return;

  // Faster, sharper flickering for the status LEDs
  lights.forEach((mat, i) => {
    const speed = 10 + (i * 2); 
    const flicker = Math.sin(time * speed) * Math.cos(time * (speed / 2));
    mat.emissiveIntensity = flicker > 0.3 ? 1.8 : 0.1;
  });
}

export function updateRasPiHover(intersect) {
  const hit = intersect?.object;
  if (!hit?.userData?.israsPi) return;

  const rasPi = hit.userData.rasPiRef || hit;
  const state = (rasPi.parent?.userData?.rasPi) ? rasPi.parent.userData.rasPi : rasPi.userData;

  if (!state.hovered) {
    // Pulse the logo colors
    rasPi.userData.raspberryParts?.forEach(mat => {
      mat.emissiveIntensity = 2.5;
    });

    const s = state.baseScale * 1.1;
    rasPi.scale.set(s, s, s);
    state.hovered = true;
  }
}

export function resetRasPiHover(scene) {
  const state = scene.userData.rasPi;
  if (!state || !state.hovered) return;

  state.object.userData.raspberryParts?.forEach(mat => {
    mat.emissiveIntensity = 0;
  });

  state.object.scale.set(state.baseScale, state.baseScale, state.baseScale);
  state.hovered = false;
}