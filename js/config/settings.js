import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function addSettingsGear(scene, colliders) {
  const loader = new GLTFLoader();

  loader.load('./models/gear.glb', (gltf) => {

    const gear = gltf.scene;

    // Base placement
    const baseScale = 1.5;
    gear.scale.set(baseScale, baseScale, baseScale);
    gear.position.set(-0.2, 0.1, 0.7);
    gear.rotation.set(0, 0.5, 0);

    // Store base scale for reset
    gear.userData.baseScale = baseScale;

    // Enable emissive glow
    gear.traverse(child => {
      if (child.isMesh && child.material) {
        child.material.emissive = child.material.color.clone();
        child.material.emissiveIntensity = 0;
      }
    });

    const gearURL = new URL('../js/config/settings.js', window.location.origin).href;

    // Tag for tooltip + overlay
    gear.userData.isgear = true;
    gear.userData.url = gearURL;

    gear.traverse(child => {
      if (child.isMesh) {
        child.userData.isgear = true;
        child.userData.url = gearURL;
      }
    });

    scene.add(gear);

    // Invisible collider
    const gearCollider = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 8, 8),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    gearCollider.position.copy(gear.position);

    gearCollider.userData = {
      isgear: true,
      url: gearURL,
      gearRef: gear
    };

    scene.add(gearCollider);
    colliders.push(gearCollider);

    // Store for hover reset
    scene.userData.settingsGear = {
      object: gear,
      baseScale,
      hovered: false
    };
  });
}

// -------------------------------
// HOVER
// -------------------------------
export function updateSettingsGearHover(intersect) {
  const hit = intersect?.object;
  if (!hit?.userData?.isgear) return;

  const gear = hit.userData.gearRef || hit;
  const state = gear.parent?.userData?.settingsGear || gear.userData;

  if (!state.hovered) {
    // Glow
    gear.traverse(child => {
      if (child.isMesh && child.material) {
        child.material.emissiveIntensity = 1.2;
      }
    });

    // Tiny scale bump
    const s = state.baseScale * 1.05;
    gear.scale.set(s, s, s);

    state.hovered = true;
  }
}

// -------------------------------
// UNHOVER
// -------------------------------
export function resetSettingsGearHover(scene) {
  const state = scene.userData.settingsGear;
  if (!state || !state.hovered) return;

  const gear = state.object;

  // Reset emissive
  gear.traverse(child => {
    if (child.isMesh && child.material) {
      child.material.emissiveIntensity = 0;
    }
  });

  // Reset scale
  gear.scale.set(state.baseScale, state.baseScale, state.baseScale);

  state.hovered = false;
}
