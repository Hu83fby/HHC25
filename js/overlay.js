import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css';

let overlayActive = false;

// --- GitHub Pages safe base path ---
const REPO_BASE = `${window.location.origin}/HHC25`;


marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  }, 
  headerIds: true, 
  mangle: false, 
  pedantic: false
});

export function initOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'overlay';

  const contentBox = document.createElement('div');
  contentBox.id = 'overlayContent';

  const closeBtn = document.createElement('button');
  closeBtn.id = 'closeOverlay';
  closeBtn.textContent = 'Close';
  closeBtn.addEventListener('click', () => {
    hideOverlay();
  });


  const contentInnerWrapper = document.createElement("div");
  contentInnerWrapper.id = "overlayContentInner";
  
  const contentInner = document.createElement('div');
  contentInner.id = 'overlayInner';
contentInnerWrapper.appendChild(contentInner);

  contentBox.appendChild(closeBtn);
  contentBox.appendChild(contentInnerWrapper);
  overlay.appendChild(contentBox);
  
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay && overlayActive) {
      hideOverlay();
    }
  });
}

export function showOverlay(url) {
  const overlay = document.getElementById('overlay');
  const contentInner = document.getElementById('overlayInner');

const finalUrl = url.startsWith("http")
  ? url
  : `${REPO_BASE}/${url.replace(/^\/+/, "")}`;

fetch(finalUrl)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${url}`);
      return res.text();
    })
    .then(md => {
      contentInner.innerHTML = marked.parse(md);
      contentInner.scrollIntoView({ block: 'start'});  // 11.13.1 fix to start at top each time

      document.dispatchEvent(new CustomEvent("overlayLoaded", { detail: url }));

      overlay.classList.add('overlayVisible');
      overlay.classList.remove('animateClose');
      overlayActive = true;

      contentInner.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
      });
    })
    .catch(err => {
      contentInner.innerHTML = `<p class="error">Error loading content: ${err.message}</p>`;
      overlay.classList.add('overlayVisible');
      overlayActive = true;
    });
}

export function hideOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.classList.add('animateClose');

  setTimeout(() => {
    overlay.classList.remove('overlayVisible');
    overlayActive = false;
    document.dispatchEvent(new Event('overlayClosed'));
    }, 400);
}

// overlay is active
export function isOverlayActive() {
  return overlayActive;
}

// section for keeping links inside overlay
if (!window.hasOverlayLinkListener) {
  document.addEventListener('click', (event) => {
    if (!overlayActive) return;  if (!overlayActive) return;

  const overlay = document.getElementById('overlay');
  if (overlay.contains(event.target)) {
    const link = event.target.closest('a');
    if (link) {
      event.preventDefault();

      const repoBase = `${window.location.origin}/HHC25`;

      if (link.href.startsWith(repoBase)) {
      const [baseUrl, hash] = link.href.split("#");
        showOverlay(baseUrl);


        if (hash) {
          setTimeout(() => {
            const target = document.getElementById(hash);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start'});
              }
          }, 300);
        }

      } else {
        window.open(link.href, '_blank', 'noopener,noreferrer');
      }
      }
    }
  });
}
