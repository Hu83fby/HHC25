import * as THREE from 'three';

let windowLight1 = null;
let windowLight2 = null;
let doorLight = null;

export function addCabinLights(scene) {
    // Shared settings: Warm Orange, Intensity 1, Distance 8
    const color = 0xffaa33;

    // Window 1 (The one you already perfected)
    windowLight1 = new THREE.PointLight(color, 1, 8);
    windowLight1.position.set(1.6, 2.0, -5.1); 
    scene.add(windowLight1);

    // right window (Adjust these coordinates to line up with the 2nd window)
    windowLight2 = new THREE.PointLight(color, 0.5, 8);
    windowLight2.position.set(2.9, 2.0, -4.8); 
    scene.add(windowLight2);

    // Door (Adjust these coordinates to line up with the door)
    doorLight = new THREE.PointLight(color, 1, 8); // Slightly more distance for the door
    doorLight.position.set(2.3, 0.6,  -4.5); 
    scene.add(doorLight);
}

export function updateCabinLights(t) {
    if (!windowLight1 || !windowLight2 || !doorLight) return;

    // Window 1: A gentle, natural fireplace flicker
    windowLight1.intensity = 0.5 + 
        Math.sin(t * 1.5) * 0.1 +    // Very slow "room glow" pulse
        Math.sin(t * 4.0) * 0.15 +   // Standard flame movement
        Math.sin(t * 23.0) * 0.05;   // Small, high-speed jitter

    // Window 2: Even calmer, slightly desynced
    windowLight2.intensity = 0.3 + 
        Math.sin(t * 1.2) * 0.08 + 
        Math.sin(t * 3.1) * 0.1 + 
        Math.sin(t * 17.0) * 0.03;

    // Door Light: More active (drafty), but still slower than before
    doorLight.intensity = 0.6 + 
        Math.sin((t + 1.2) * 2.0) * 0.15 + 
        Math.sin(t * 6.0) * 0.1 + 
        Math.sin(t * 37.0) * 0.08;
}