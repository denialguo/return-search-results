let lastGoodStats = '';

function getStatsText() {
    const nativeStats = document.getElementById('result-stats');
    if (!nativeStats) return '';
    const text = nativeStats.textContent.trim();
    if (!text || text.length < 5) return '';
    return text;
}

function isRealCount(text) {
    return text && !/\b0 results?\b/i.test(text);
}

function hideNative() {
    const nativeStats = document.getElementById('result-stats');
    if (!nativeStats) return;
    Object.assign(nativeStats.style, {
        visibility: 'hidden',
        position: 'absolute',
        pointerEvents: 'none',
        opacity: '0',
        height: '0',
        overflow: 'hidden'
    });
}

function updateDisplay() {
    const text = getStatsText();

    if (isRealCount(text)) {
        lastGoodStats = text;
    }

    const displayText = lastGoodStats || text;
    if (!displayText) return;

    hideNative();

    const existing = document.getElementById('rsr-stats');
    if (existing) {
        existing.textContent = displayText;
        return;
    }

    const el = document.createElement('div');
    el.id = 'rsr-stats';
    el.textContent = displayText;
    Object.assign(el.style, {
        color: '#70757a',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        userSelect: 'text',
        cursor: 'text',
        position: 'absolute',
        right: '250px',
        bottom: '8px',
        pointerEvents: 'auto',
        zIndex: '100'
    });

    const navBar = document.querySelector('div[role="navigation"]');
    const navWrapper = navBar
        ? navBar.closest('.YNk70c') || navBar.parentElement
        : document.querySelector('.YNk70c');

    if (navWrapper) {
        const cs = window.getComputedStyle(navWrapper);
        if (cs.position === 'static') {
            navWrapper.style.position = 'relative';
        }
        navWrapper.appendChild(el);
        return;
    }

    const centerCol = document.getElementById('center_col');
    if (centerCol) {
        el.style.position = 'relative';
        el.style.bottom = 'auto';
        el.style.right = 'auto';
        el.style.textAlign = 'right';
        centerCol.prepend(el);
    }
}

// Open Google's Tools menu briefly so the result count is populated.
function triggerToolsToGetCount() {
    const toolsBtn = document.getElementById('hdtb-tls');
    if (!toolsBtn) return;

    // If the real count is already available, update and stop.
    if (isRealCount(getStatsText())) {
        updateDisplay();
        return;
    }

    // Keep the Tools menu hidden while we toggle it.
    const toolsMenu = document.getElementById('hdtbMenus');
    if (toolsMenu) {
        toolsMenu.style.transition = 'none';
        toolsMenu.style.opacity = '0';
        toolsMenu.style.visibility = 'hidden';
    }

    // Open Tools so Google loads the count.
    toolsBtn.click();

    // Wait a moment, then read the count and close Tools.
    setTimeout(() => {
        updateDisplay();

        // Close Tools again.
        toolsBtn.click();

        // Restore the Tools menu visibility.
        setTimeout(() => {
            if (toolsMenu) {
                toolsMenu.style.transition = '';
                toolsMenu.style.opacity = '';
                toolsMenu.style.visibility = '';
            }
            updateDisplay();
        }, 50);
    }, 300);
}

// Run once when the script loads.
updateDisplay();

// If there is no valid count yet, try the Tools workaround.
setTimeout(() => {
    if (!isRealCount(lastGoodStats)) {
        triggerToolsToGetCount();
    }
}, 50);

// Keep the display updated when the page changes.
const bodyObserver = new MutationObserver(() => {
    requestAnimationFrame(updateDisplay);
});
bodyObserver.observe(document.body, { childList: true, subtree: true });