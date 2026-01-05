import * as THREE from 'three'; 
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadGround(scene, onLoaded) {
    const loader = new GLTFLoader();

    loader.load('models/ground.glb', (gltf) => {
        const ground = gltf.scene; 
        ground.scale.set(1, 1, 1);
        ground.position.set(0, .2, -3);

        ground.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = false; 
                child.receiveShadow = true; 
            }
        }); 

        scene.add(ground); 

        if (onLoaded) onLoaded(ground); 
    });
}