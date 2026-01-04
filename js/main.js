import * as THREE from 'three';
import { loadTree } from './tree.js';
import { createControls } from './controls.js';
import { loadOrnaments, updateOrnamentHover } from './ornaments.js';
import { addGarland } from './garland.js';
import { addSnowfall, updateSnowfall } from './snowfall.js';
import { initOverlay, showOverlay, hideOverlay, isOverlayActive } from './overlay.js';
import { onOrnamentHover, onOrnamentUnhover } from './ornament_tooltip.js';
import { loadGround } from './world/ground.js';
import { loadCabin } from './world/cabin.js';
import { loadSnowTree, placeTree } from './world/forest.js';
import { createGradientSky } from './sky.js';
import { loadTrain } from './world/train.js';
import { createPerformanceMonitor } from './config/performance.js';
import { addBulbsToScene} from './christmas_bulb.js' 
import { treeConfig } from './treeConfig.js';
import { addTreeTopper } from './tree_topper.js' 
import { addSettingsGear, updateSettingsGearHover, resetSettingsGearHover } from './config/settings.js';
import { AudioManager } from './config/audio.js';
import { addGifts } from './world/gift.js';
import { injectStartupMessage } from './startup.js';
import { setInteractiveCursor } from './cursor.js';
import { addCabinLights, updateCabinLights } from './world/cabinLights.js';
import { addMusicNotes, resetMusicNotesHover, updateMusicNotesHover } from './world/music_notes.js';
import { initMusicConfigUI } from './config/music_config.js';
import { addRasPi, updateRasPiHover, resetRasPiHover, animateRasPi } from './world/pi.js';  
import { initPerfConfigUI } from './config/pi_config.js';

const scene = new THREE.Scene();

// camera setup 
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ 
  antialias: true,
  canvas: document.getElementById('treeCanvas'),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
renderer.clear();

// global scene lights 
const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4 );
scene.add(hemi);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// lights around the tree
let indLightStrength = 0.5;
const indLight1 = new THREE.PointLight(0x88aaff, indLightStrength, 25); 
indLight1.position.set(0, 1, 1.5); 
scene.add(indLight1);  

const indLight2 = new THREE.PointLight(0x88aaff, indLightStrength, 25); 
indLight2.position.set(1.5, 1, 0); 
scene.add(indLight2);  

const indLight3 = new THREE.PointLight(0x88aaff, indLightStrength, 25); 
indLight3.position.set(-1.5, 1, 0); 
scene.add(indLight3);  


const controls = createControls(camera, renderer);
const colliders = [];
controls.minDistance = 2;   // prevents clipping into the tree
controls.maxDistance = 10;  // prevents drifting into the void
controls.minPolarAngle = Math.PI * 0.2;  // prevent looking straight down
controls.maxPolarAngle = Math.PI * 0.48; // prevent looking straight up

const monitor = createPerformanceMonitor(renderer); 
window.monitor = monitor;

loadOrnaments(scene, colliders);
addGarland(scene);
addSnowfall(scene);
loadGround(scene);
addBulbsToScene(scene, treeConfig);
addTreeTopper(scene, colliders);
addSettingsGear(scene, colliders);
addCabinLights(scene);
addMusicNotes(scene, colliders);
addRasPi(scene, colliders);


initOverlay();
injectStartupMessage();

// sky
const sky = createGradientSky();
scene.add(sky);


// forest trees
await loadSnowTree();
placeTree(scene, -6, .2, -1);  // left
placeTree(scene, -6, .2, -6);  // left
placeTree(scene, -4, .2, -4);  // left
placeTree(scene, -1, .2, -6);  // left
placeTree(scene, -2, .2, -9);  // left
placeTree(scene, 6, .2, -1);  // right
placeTree(scene, 5, .2, 2);  // right
placeTree(scene, 6, .2, -5);  // right

// presents under the tree
const giftPositions = [
  { x: -0.8, y: 0.05, z: 0.5 }, // left
  { x: -1.2, y: 0.05, z: 0.8 },
  { x: -1.5, y: 0.05, z: 0.2 },
  { x: -0.7, y: 0.05, z: 1.1 },
  { x: 0.7,  y: 0.05, z: 0.4 }, // right
  { x: 1.0,  y: 0.05, z: 0.9 },
  { x: 1.6,  y: 0.05, z: 0.6 },
  { x: 0.2,  y: 0.05, z: 1.2 },
];

addGifts(scene, giftPositions);



window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onClick(event) {
  if (isOverlayActive()) return;

  // Only call start if the context is suspended OR if nothing has played yet
  if (window.audioManager) {
    const isSuspended = window.audioManager.listener.context.state !== 'running';
    const noBuffer = !window.audioManager.sound.buffer;
    
    if (isSuspended || noBuffer) {
      window.audioManager.start();
    }
  }
  
  if (typeof window.hideStartupMessage === 'function') {
    window.hideStartupMessage();
  }

  //  Standard raycasting to find specific objects
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(colliders, true);
  if (intersects.length === 0) return; // Exit if no object was hit

  const hit = intersects[0].object;
  const url = hit.userData?.url;

  if (url) {
    event.stopPropagation(); 
    showOverlay(url); // Opens music_config.md or ornament info
  }
}

let lastRaycastTime = 0;
const RAYCAST_INTERVAL = 32; // ~30fps

function onMouseMove(event) {

  const now = performance.now();
  if (now - lastRaycastTime < RAYCAST_INTERVAL) return;
  lastRaycastTime = now;


  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(colliders, true);

  if (intersects.length > 0) {
    const hit = intersects[0].object;

    // --- MUSIC NOTES HOVER ---
    if (hit.userData.isMusicNotes) {
      updateMusicNotesHover(intersects[0]);
      setInteractiveCursor(true);
      return; // stop here so ornaments don't override it
    } else {
      resetMusicNotesHover(scene);
    }

        // SETTINGS GEAR HOVER
    if (hit.userData.isgear) {
      updateSettingsGearHover(intersects[0]);
    } else {
      resetSettingsGearHover(scene);
    }

    // raspberry pi hover
      if (hit.userData.israsPi) {
        updateRasPiHover(intersects[0]);
        setInteractiveCursor(true);
    } else {
        resetRasPiHover(scene);
    }

    // --- ORNAMENT TOOLTIP ---
    if (hit.userData.isOrnament && hit.userData.ornamentRef) {
      onOrnamentHover(hit.userData.ornamentRef);
      setInteractiveCursor(true);
    } else if (hit.userData.url) {
      onOrnamentHover(hit);
      setInteractiveCursor(true);
    } else {
      onOrnamentUnhover();
      setInteractiveCursor(false);
    }

    // --- ORNAMENT GLOW ---
    updateOrnamentHover(intersects[0]);

  } else {
    // Nothing hovered
    resetRasPiHover(scene);
    resetMusicNotesHover(scene);
    resetSettingsGearHover(scene);
    onOrnamentUnhover();
    updateOrnamentHover(null);
    setInteractiveCursor(false);
  }
}


// listners config
document.addEventListener("overlayLoaded", (e) => {
  //  Handle Music
  if (e.detail.includes("music_config.md")) {
    requestAnimationFrame(() => initMusicConfigUI());
  }
  
  // Handle Raspberry Pi Performance Panel
  if (e.detail.includes("perf_config.md")) {
    requestAnimationFrame(() => initPerfConfigUI());

  } else {
    // If any other overlay opens, hide the performance panel
    if (monitor) monitor.setVisible(false);
  }
});

// Hide the panel when the overlay is closed via the 'X' button
document.addEventListener("overlayClosed", () => {
  if (monitor) monitor.setVisible(false);
});


// Camera Controls
const cameraTarget = new THREE.Vector3(); 

function setCameraHeight(y) {
  cameraTarget.set(0, y, 0);
}

// Christmas Tree
loadTree(scene, (tree) => {
  camera.position.set(-0.3, 3, 5);

  // Start by looking at the middle of the tree
  setCameraHeight(tree.position.y + 2);
});

// audio
const audioManager = new AudioManager(camera);

// Expose to window for your Settings Page to find
window.audioManager = audioManager;

let cabinMixer = null;
loadCabin(scene, ( cabin, mixer ) => {
  cabinMixer = mixer;
  });

let trainMixer = null;
loadTrain(scene, ( {train, mixer }) => {
  trainMixer = mixer;
  });


const clock = new THREE.Clock(); 

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const t = clock.elapsedTime;

   updateSnowfall(delta, t);
  monitor.update();


    if (trainMixer) trainMixer.update(delta);
    if (cabinMixer) cabinMixer.update(delta);
    updateCabinLights(t);

    animateRasPi(scene, t);

    controls.update();
    renderer.render(scene, camera);

  const bulbInst = scene.userData.bulbInst;
  if (bulbInst) {
    bulbInst.material.uniforms.uTime.value = t;
}
}

animate();

window.addEventListener('mousemove', onMouseMove);
treeCanvas.addEventListener('click', onClick);

// clean up 
function disposeObject(obj) {
  if (obj.geometry) obj.geometry.dispose();
  
  if (obj.material) {
    if (Array.isArray(obj.material)) {
      obj.material.forEach(m => {
        // Dispose textures within the material
        Object.keys(m).forEach(key => {
          if (m[key] && m[key].isTexture) m[key].dispose();
        });
        m.dispose();
      });
    } else {
      Object.keys(obj.material).forEach(key => {
        if (obj.material[key] && obj.material[key].isTexture) obj.material[key].dispose();
      });
      obj.material.dispose();
    }
  }
}
