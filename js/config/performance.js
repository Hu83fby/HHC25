import Stats from 'stats.js';

function formatNumber(n) {
  return n.toLocaleString();
}

export function createPerformanceMonitor(renderer) {
    const stats = new Stats(); 
    stats.showPanel(0);  // 0 = FPS
    stats.dom.style.display = "none";

    document.body.appendChild(stats.dom); 

    const panel = document.createElement('div');
    panel.classList.add('perf-panel'); 
    panel.style.display = "none";
    document.body.appendChild(panel); 

    function getStatsHTML() {
    return panel.innerHTML;
    }


    function update() {

        stats.begin();

        const info = renderer.info; 
        const mem = performance.memory || null; 

        panel.innerHTML = `
            <strong>GPU</strong><br>
            Draw Calls: ${formatNumber(info.render.calls)}<br>
            Triangles: ${formatNumber(info.render.triangles)}<br>
            Geometries: ${formatNumber(info.memory.geometries ?? 'N/A')}<br>
            Textures: ${formatNumber(info.memory.textures)}<p><br></p>

            <strong>JS Memory</strong><br>
            Used: ${mem ? (mem.usedJSHeapSize / 1048576).toFixed(2) : 'N/A'} MB<br>
            Total: ${mem ? (mem.totalJSHeapSize / 1048576).toFixed(2) : 'N/A'} MB<br>
            Limit: ${mem ? formatNumber(Number((mem.jsHeapSizeLimit / (1024 * 1024 * 1024)).toFixed(2))) : 'N/A'} GB<br>
        `; 

        stats.end(); 
    }

    function setVisible(visible) {
        const mode = visible ? 'block' : 'none';
        panel.style.display = mode;
        stats.dom.style.display = mode;
    }
    return { update, setVisible, getStatsHTML }; 
}