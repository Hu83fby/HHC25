// docs/startup.js

export function injectStartupMessage() {
  const div = document.createElement('div');
  div.id = 'clickToStart';
  div.classList.add('click-to-start');

  div.innerHTML = `
    <div class="click-to-start-text">
      Click here <br>to explore the tree!
    </div>
  `;

  document.body.appendChild(div);

  setTimeout(() => {
    div.classList.add('visible');
  }, 600);

  window.hideStartupMessage = () => {
    const div = document.getElementById('clickToStart');
    if (div) {
      div.classList.add('hidden');
      setTimeout(() => div.remove(), 300);
    }
    // Clean up the backup listener too
    window.removeEventListener('click', window.hideStartupMessage);
  };

  window.addEventListener('click', window.hideStartupMessage, { once: true });
}