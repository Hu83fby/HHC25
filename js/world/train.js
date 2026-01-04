import * as THREE from 'three'; 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadTrain(scene, onLoaded) {
    const loader = new GLTFLoader(); 

    // temp changing model for testing
    loader.load('models/train.glb', (gltf) => {
        const train = gltf.scene;

        train.scale.set(1.5, 1.2, 1.2); 

        train.position.set(0, .2, 0); 
        train.rotation.y = Math.PI; 

        scene.add(train); 

        let mixer = null; 
        if (gltf.animations && gltf.animations.length > 0 ) {
            mixer = new THREE.AnimationMixer(train); 
            const action = mixer.clipAction(gltf.animations[0]);
            action.play();
        }

        if (onLoaded) onLoaded({train, mixer});
    });
}