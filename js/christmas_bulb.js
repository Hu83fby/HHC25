// Instanced bulbs with shader-driven blinking + color cycling.

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { bulbShader } from './bulbShader.js';

export function addBulbsToScene(scene, treeConfig) {
  const {
    radius,
    height,
    goldenAngle,
    bias,
    originOffset,
    position,
    trunkOffset
  } = treeConfig;

  const bulbCount = 300;
  const jitter = 0.07;
  const bulbScale = 0.5;

  const loader = new GLTFLoader();

  loader.load('models/christmas_bulb.glb', (gltf) => {
    const bulbMesh = gltf.scene.getObjectByName('bulb');
    const baseMesh = gltf.scene.getObjectByName('base');

    if (!bulbMesh) {
      return;
    }

    // ------------------------------------------------------------
    // GEOMETRY
    // ------------------------------------------------------------
    const bulbGeo = bulbMesh.geometry.clone();
    const baseGeo = baseMesh ? baseMesh.geometry.clone() : null;

    // Rotate bulb so its "forward" direction is -Z (outward)
    bulbGeo.rotateX(Math.PI / 2);
    if (baseGeo) baseGeo.rotateX(Math.PI / 2);

    // Scale
    bulbGeo.scale(bulbScale, bulbScale, bulbScale);
    if (baseGeo) baseGeo.scale(bulbScale, bulbScale, bulbScale);

    // ------------------------------------------------------------
    // SHADER MATERIAL (replaces GLTF material)
    // ------------------------------------------------------------
    const bulbMat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(bulbShader.uniforms),
      vertexShader: bulbShader.vertexShader,
      fragmentShader: bulbShader.fragmentShader,
      transparent: true,
      depthWrite: false
    });

    // Base still uses normal material
    const baseMat = baseMesh ? baseMesh.material.clone() : null;

    // ------------------------------------------------------------
    // INSTANCE ATTRIBUTES
    // ------------------------------------------------------------
    const colors = new Float32Array(bulbCount * 3);
    const speeds = new Float32Array(bulbCount);
    const offsets = new Float32Array(bulbCount);

    for (let i = 0; i < bulbCount; i++) {
      // Random color (HSL gives nice Christmas hues)
      const color = new THREE.Color().setHSL(Math.random(), 0.9, 0.5);
      colors[i * 3 + 0] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Blink speed
      speeds[i] = 1.0 + Math.random() * 2.0;

      // Phase offset
      offsets[i] = Math.random() * Math.PI * 2;
    }

    bulbGeo.setAttribute('instanceColor', new THREE.InstancedBufferAttribute(colors, 3));
    bulbGeo.setAttribute('instanceSpeed', new THREE.InstancedBufferAttribute(speeds, 1));
    bulbGeo.setAttribute('instanceOffset', new THREE.InstancedBufferAttribute(offsets, 1));

    // ------------------------------------------------------------
    // INSTANCE MESHES
    // ------------------------------------------------------------
    const bulbInst = new THREE.InstancedMesh(bulbGeo, bulbMat, bulbCount);
    const baseInst = baseGeo ? new THREE.InstancedMesh(baseGeo, baseMat, bulbCount) : null;

    const dummy = new THREE.Object3D();

    // ------------------------------------------------------------
    // POSITIONING LOOP (unchanged — your perfect placement)
    // ------------------------------------------------------------
    for (let i = 0; i < bulbCount; i++) {
      const t = 1 - Math.pow(1 - i / bulbCount, 0.7);
      const y = position.y + trunkOffset + t * (height - trunkOffset);
      const r = radius * 0.5 * (1 - Math.pow(t, bias));
      const theta = i * goldenAngle;

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      const jx = (Math.random() - 0.5) * jitter;
      const jy = (Math.random() - 0.5) * jitter;
      const jz = (Math.random() - 0.5) * jitter;

      dummy.position.set(
        x + jx + position.x + originOffset.x,
        y + jy,
        z + jz + position.z + originOffset.z
      );

      // Outward-facing rotation + wobble
      const dx = x + jx;
      const dz = z + jz;

      let angleY = Math.atan2(dx, dz);
      angleY += (Math.random() - 0.5) * 0.17;

      const angleX = (Math.random() - 0.5) * 0.12;
      const angleZ = (Math.random() - 0.5) * 0.12;

      dummy.rotation.set(angleX, angleY, angleZ);
      dummy.updateMatrix();

      bulbInst.setMatrixAt(i, dummy.matrix);
      if (baseInst) baseInst.setMatrixAt(i, dummy.matrix);
    }

    bulbInst.instanceMatrix.needsUpdate = true;
    if (baseInst) baseInst.instanceMatrix.needsUpdate = true;

    // ------------------------------------------------------------
    // ADD TO SCENE
    // ------------------------------------------------------------
    scene.add(bulbInst);
    if (baseInst) scene.add(baseInst);

    // Expose for animate loop
    scene.userData.bulbInst = bulbInst;
  });
}