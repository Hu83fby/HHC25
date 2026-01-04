// bulbShader.js
export const bulbShader = {
  uniforms: {
    uTime: { value: 0 }
  },
  vertexShader: `
    attribute vec3 instanceColor;
    attribute float instanceSpeed;
    attribute float instanceOffset;

    varying vec3 vColor;
    varying float vSpeed;
    varying float vOffset;

    void main() {
      vColor = instanceColor;
      vSpeed = instanceSpeed;
      vOffset = instanceOffset;

      vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vSpeed;
    varying float vOffset;

    uniform float uTime;

    void main() {
      // 0.0 → 1.0 blinking wave
      float raw = sin(uTime * vSpeed + vOffset) * 0.5 + 0.5;

      // Smooth brightness range
      float brightness = mix(0.05, 1.0, raw);

      // Emissive glow (no bloom needed)
      vec3 emissive = vColor * brightness * 2.0;

      gl_FragColor = vec4(emissive, 3.0);
    }
  `
};
