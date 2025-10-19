window.addEventListener('load', function () {
    const toolsButton = document.querySelector('#hdtb-tls');
    
    if (toolsButton) {
        console.log('Tools button found. Clicking now...');
        toolsButton.click();
    } else {
        console.log('Tools button not found.');
    }
});