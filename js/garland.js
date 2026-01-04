import * as THREE from 'three';
import { treeConfig } from './treeConfig';

export function addGarland(scene) {
  const { radius, height, trunkOffset, originOffset } = treeConfig;

  const segments = 200;
  const garlandRadiusFactor = 0.85;

  // Build the spiral points 
  const points = [];
  for (let i = 0; i < segments; i++) {
    const angle = i * (Math.PI / 12);
    const garlandHeight = trunkOffset + (i / segments) * (height - trunkOffset);
    const garlandRadius = radius * garlandRadiusFactor * Math.pow(1 - garlandHeight / height, 0.5);

    points.push(
      new THREE.Vector3(
        Math.cos(angle) * garlandRadius,
        garlandHeight - height / 2,
        Math.sin(angle) * garlandRadius
      )
    );
  }

  const curve = new THREE.CatmullRomCurve3(points);

  // Create a tiny sphere geometry for bulbs
  const bulbGeometry = new THREE.SphereGeometry(0.009, 8, 8);

  // Emissive material for glow
  const bulbMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    emissive: 0xff0000,
    emissiveIntensity: 2
  });

  // Instanced mesh for all bulbs
  const bulbCount = 450;
  const bulbs = new THREE.InstancedMesh(bulbGeometry, bulbMaterial, bulbCount);

  // Place bulbs along the curve
  const dummy = new THREE.Object3D();
  for (let i = 0; i < bulbCount; i++) {
    const t = i / bulbCount;
    const pos = curve.getPointAt(t);

    dummy.position.copy(pos);
    dummy.updateMatrix();
    bulbs.setMatrixAt(i, dummy.matrix);
  }

  // Offset to match tree origin
  bulbs.position.set(originOffset.x, originOffset.y, originOffset.z);

  scene.add(bulbs);
}
