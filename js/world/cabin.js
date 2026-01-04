import * as THREE from 'three'; 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadCabin(scene, onLoaded) {
    const loader = new GLTFLoader(); 

    loader.load('models/snow_logCabin.glb', (gltf) => {
        const cabin = gltf.scene; 
        cabin.position.set(3, 0, -7);
        cabin.rotation.set(0, -.3, 0);
        cabin.scale.set(1, 1, 1);


        cabin.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true; 
                child.receiveShadow = true; 
            }
        }); 
        
        scene.add(cabin); 

        let mixer = null; 
        if (gltf.animations && gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(cabin); 
            const action = mixer.clipAction(gltf.animations[0]); 
            action.play(); 
        }
       

        if (onLoaded) onLoaded(cabin, mixer); 
    }); 
}