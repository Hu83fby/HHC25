import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { treeConfig } from './treeConfig';

// Main Christmas Tree
export function loadTree(scene, onLoaded) { 
  const loader = new GLTFLoader(); 

  loader.load('models/christmas_tree.glb', (gltf) => {
    const tree = gltf.scene;

    tree.scale.set(
      treeConfig.scale.x, 
      treeConfig.scale.y, 
      treeConfig.scale.z
    );

    tree.position.set(
      treeConfig.position.x, 
      treeConfig.position.y,
      treeConfig.position.z
    ); 

    scene.add(tree);

    if (onLoaded) onLoaded(tree);   // ← callback now works
  }); 
}
