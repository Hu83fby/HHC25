import * as THREE from 'three'; 
import { treeConfig } from './treeConfig';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function addTreeTopper(scene, colliders) {
      const loader = new GLTFLoader();


  loader.load('./models/frosty_topper.glb', (gltf) => {

    const {height, originOffset } = treeConfig; 
    const topper = gltf.scene; 
    topper.scale.set(0.15, 0.15, 0.15); 
    topper.position.set(0, height / 2 + 0.25, 0); 

// Uncomment this line for debugging links
//    const topperURL = new URL( './docs/HHC_2025/readme.md', window.location.origin).href;

const topperURL = new URL( './docs/credits.md', window.location.origin).href;

    topper.userData = { isTopper: true, url: topperURL }; 
    topper.traverse(child => {
      if (child.isMesh) child.userData = { isTopper: true, url: topperURL }; 
    }); 

    topper.position.x += originOffset.x;
    topper.position.y += originOffset.y;
    topper.position.z += originOffset.z;

    scene.add(topper); 

    const light = new THREE.PointLight(0xffffff, .2, 5); 
    light.position.set(-0.05, height / 2 + 1.85, 0.3); 
    scene.add(light); 
    
    const topperCollider = new THREE.Mesh(
      new THREE.SphereGeometry(.2, 16, 16), 
      new THREE.MeshBasicMaterial({ visible: false})
    ); 
    topperCollider.position.copy(topper.position); 
    topperCollider.userData = { isTopper: true, url: topperURL }; 

    scene.add(topperCollider);
    colliders.push(topperCollider);

  });
}
