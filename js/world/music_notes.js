// world/music_notes.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function addMusicNotes(scene, colliders) {
  const loader = new GLTFLoader();

  loader.load('./models/music_notes.glb', (gltf) => {

    // The actual notes object
    const music = gltf.scene;

    // Base placement
    const baseScale = 1.5;
    music.scale.set(baseScale, baseScale, baseScale);
    music.position.set(1.5, 0.1, -0.1);
    music.rotation.set(0, -0.5, 0);

    // Store base Y for optional lift
    const baseY = music.position.y;

    // Enable emissive glow on all meshes
    music.traverse(child => {
      if (child.isMesh && child.material) {
        child.material.emissive = child.material.color.clone();
        child.material.emissiveIntensity = 0;
      }
    });

    // URL for your overlay
    const musicNotesURL = new URL('./js/config/music_config.md', window.location.origin).href;

    // Tag the root object for click + tooltip
    music.userData = {
      isMusicNotes: true,
      url: musicNotesURL,
      baseY
    };

    // Tag each mesh inside the GLB for raycasting
    music.traverse(child => {
      if (child.isMesh) {
        child.userData = {
          isMusicNotes: true,
          url: musicNotesURL,
          baseY
        };
      }
    });

    scene.add(music);

    // Invisible collider (optional but consistent with your system)
    const collider = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 12, 12),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    collider.position.copy(music.position);

    collider.userData = {
      isMusicNotes: true,
      url: musicNotesURL,
      notesRef: music,
      baseY
    };

    scene.add(collider);
    colliders.push(collider);

    // Store reference for hover reset
    scene.userData.musicNotes = {
      object: music,
      baseY,
      hovered: false
    };
  });
}

// -------------------------------
// HOVER GLOW
// -------------------------------
export function updateMusicNotesHover(intersect) {
  const hit = intersect?.object;
  if (!hit?.userData?.isMusicNotes) return;

  const notes = hit.userData.notesRef || hit.parent || hit;
  const state = notes.parent?.userData?.musicNotes || notes.userData;

  if (!state.hovered) {
    // Turn on emissive glow
    notes.traverse(child => {
      if (child.isMesh && child.material) {
        child.material.emissiveIntensity = 1.2;
      }
    });

    // Optional tiny lift
    notes.position.y = state.baseY + 0.03;

    state.hovered = true;
  }
}

// -------------------------------
// UNHOVER RESET
// -------------------------------
export function resetMusicNotesHover(scene) {
  const state = scene.userData.musicNotes;
  if (!state || !state.hovered) return;

  const notes = state.object;

  // Reset emissive
  notes.traverse(child => {
    if (child.isMesh && child.material) {
      child.material.emissiveIntensity = 0;
    }
  });

  // Reset lift
  notes.position.y = state.baseY;

  state.hovered = false;
}

// No animation loop needed
export function animateMusicNotes() {
  // intentionally empty
}
