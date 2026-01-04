export function initPerfConfigUI() {
    const perf = window.monitor;
    if (!perf) return;

    const container = document.getElementById("perf-overlay-content");
    if (!container) return;

    function waitForStats() {
        const html = perf.getStatsHTML();

        // If empty, try again next frame
        if (!html || html.trim() === "") {
            requestAnimationFrame(waitForStats);
            return;
        }

        // Once we have real data, inject it and start live sync
        container.innerHTML = html;
        sync();
    }

    function sync() {
        if (!document.body.classList.contains("overlay-active")) return;

        container.innerHTML = perf.getStatsHTML();
        requestAnimationFrame(sync);
    }

    // Start waiting for the first non-empty stats block
    waitForStats();
}
