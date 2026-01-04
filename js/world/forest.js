import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let baseTree = null; 

export async function loadSnowTree() {
  const loader = new GLTFLoader(); 
  const gltf = await loader.loadAsync('./models/snow_tree.glb');
  baseTree = gltf.scene;
}

export function createTree() {
  if (!baseTree) {
    return null; 
  }

  const forestTree = baseTree.clone(true); 

  forestTree.rotation.y = Math.random() * Math.PI * 2;   // random tree rotation
  
  const s = 0.6 + Math.random() * 0.4;  // random tree scale
  forestTree.scale.set(s, s, s);

  return forestTree;
}

export function placeTree(scene, x, y, z) {
  const forestTree = createTree(); 
  if (!forestTree) return; 

  forestTree.position.set(x, y, z); 
  scene.add(forestTree); 

  return forestTree;
}