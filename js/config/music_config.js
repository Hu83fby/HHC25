// docs/music_config.js

export function initMusicConfigUI() {
  const audio = window.audioManager;
  if (!audio) return;

  // --- Volume Slider ---
  const volContainer = document.getElementById("music-volume");
  if (volContainer) {
    volContainer.innerHTML = `
      <label style="display:block; margin-bottom:6px;">Master Volume</label>
      <input type="range" min="0" max="1" step="0.01" id="musicVolumeSlider" style="width:100%;">
    `;
    const slider = document.getElementById("musicVolumeSlider");
    // AudioManager uses listener.setMasterVolume, so we check that
    slider.value = audio.listener.getMasterVolume();
    slider.oninput = () => audio.setVolume(parseFloat(slider.value));
  }

  // --- Track Selector ---
  const trackContainer = document.getElementById("music-track");
  if (trackContainer && audio.playlist) {
    const options = audio.playlist
      .map((t, i) => `<option value="${i}">${t.name}</option>`)
      .join("");

    trackContainer.innerHTML = `
      <label style="display:block; margin-bottom:6px;">Track</label>
      <select id="musicTrackSelect" style="width:100%; padding:6px; background:#222; color:white; border:1px solid #444;">
        ${options}
      </select>
    `;

    const select = document.getElementById("musicTrackSelect");
    select.value = audio.currentIndex;
    select.onchange = () => audio.loadAndPlay(parseInt(select.value));
  }

  // --- Loop Toggle ---
  const loopContainer = document.getElementById("music-loop");
  if (loopContainer) {
    loopContainer.innerHTML = `
      <label style="cursor:pointer; display:flex; align-items:center; gap:8px;">
        <input type="checkbox" id="musicLoopToggle">
        Loop Current Track
      </label>
    `;

    const toggle = document.getElementById("musicLoopToggle");
    // Safe check if sound is defined
    toggle.checked = audio.sound ? audio.sound.loop : false;
    toggle.onchange = () => {
      if (audio.sound) audio.sound.setLoop(toggle.checked);
    };
  }

  // --- Playback Controls ---
  const playContainer = document.getElementById("music-play");
  if (playContainer) {
    playContainer.innerHTML = `
      <div style="margin-bottom:10px;">
        <button id="musicPlayPause" style="padding:6px 12px; cursor:pointer;">Play / Pause</button>
        <button id="musicSkip" style="padding:6px 12px; cursor:pointer; margin-left:5px;">Skip</button>
      </div>
      <div id="musicNowPlaying" style="font-size:0.9em; color:#aaa;"></div>
    `;

    const btn = document.getElementById("musicPlayPause");
    btn.onclick = () => {
      if (audio.sound && audio.sound.isPlaying) audio.pause();
      else audio.resume();
    };

    const skipBtn = document.getElementById("musicSkip");
    skipBtn.onclick = () => audio.skip();

    const updateStatus = () => {
      const nowPlaying = document.getElementById("musicNowPlaying");
      if (nowPlaying && audio.playlist[audio.currentIndex]) {
        nowPlaying.textContent = `Now Playing: ${audio.playlist[audio.currentIndex].name}`;
      }
    };
    updateStatus();
    
    // Update text whenever the track might change
    skipBtn.addEventListener('click', () => setTimeout(updateStatus, 100));
  }
}