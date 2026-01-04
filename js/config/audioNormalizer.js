export function createAudioNormalizer(audioContext, targetRMS = 0.15) {
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 2048;

  const data = new Uint8Array(analyser.fftSize);

  function measureRMS() {
    analyser.getByteTimeDomainData(data);

    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const v = (data[i] - 128) / 128;
      sum += v * v;
    }

    return Math.sqrt(sum / data.length);
  }

  function normalize(sourceNode, gainNode) {
    sourceNode.connect(analyser);

    setTimeout(() => {
      const rms = measureRMS();

      if (rms > 0) {
        const correction = targetRMS / rms;

        gainNode.gain.cancelScheduledValues(audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          gainNode.gain.value * correction,
          audioContext.currentTime + 0.5
        );
      }
      sourceNode.disconnect(analyser);
    }, 1000);
  }

  return { normalize };
}
