import { loadOrnaments } from "./ornaments";

let popup = document.getElementById('ornamentTooltip');

export function showOrnamentTooltip(ornament) {
    if (!popup) { 
        popup = document.createElement('div');
        popup.id = 'ornamentTooltip';
        document.body.appendChild(popup);
    }

    const { level, url }= ornament.userData;

    let name = 'Ornament';
    if (url) { 
        const parts = url.split('/'); 
        const lastSegment = parts[parts.length - 1];
        name = lastSegment.replace('.md', '');
    }
   
    popup.classList.add('visible');

    popup.innerHTML = `
        Level: ${level} | ${name}
                `;
}

export function hideOrnamentTooltip() {
    if (popup) {
        popup.classList.remove('visible'); 
        popup.innerHTML = '';
    }
}

export function onOrnamentHover(ornament) {
    showOrnamentTooltip(ornament); 
}

export function onOrnamentUnhover() {
    hideOrnamentTooltip(); 
}