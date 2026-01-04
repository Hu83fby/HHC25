// utils/frustum.js
import * as THREE from 'three';

/**
 * Calculate the visible width/height of the camera frustum at a given Z depth.
 * @param {THREE.PerspectiveCamera} camera
 * @param {number} zDepth - world Z coordinate where you want to place lights
 * @returns {{width: number, height: number}}
 */
export function getFrustumSizeAtZ(camera, zDepth) {
  const vFOV = THREE.MathUtils.degToRad(camera.fov); // vertical FOV in radians
  const height = 2 * Math.tan(vFOV / 2) * Math.abs(zDepth - camera.position.z);
  const width = height * camera.aspect;
  return { width, height };
}
