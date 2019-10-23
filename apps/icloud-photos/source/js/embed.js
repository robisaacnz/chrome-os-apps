// Get webview element
var webview = document.getElementById('webview');

// Initial page zoom factor
var zoomFactor = 1.0;

// Listen to keydown event
window.onkeydown = function (e) {
    // Check for Ctrl vs. Meta modifier key
    var modifierActive = (navigator.platform.startsWith('Mac')) ? e.metaKey : e.ctrlKey;
    var altModifierActive = (navigator.platform.startsWith('Mac')) ? e.ctrlKey : e.altKey;

    // Keystroke Ctrl+R reloads the app
    if (modifierActive && e.keyCode == 'R'.charCodeAt(0)) {
        webview.reload();
    }

    // Keystroke Ctrl+= zooms in
    if (modifierActive && e.keyCode == 187) {
        zoomFactor += 0.1;
        webview.setZoom(zoomFactor);
    }

    // Keystroke Ctrl+- zooms out
    if (modifierActive && e.keyCode == 189) {
        zoomFactor -= 0.1;

        // Don't let zoom drop below 0.2
        if (zoomFactor <= 0.2) {
            zoomFactor = 0.2;
        }

        webview.setZoom(zoomFactor);
    }

    // Keystroke Ctrl+0 resets the zoom factor
    if (modifierActive && e.keyCode == '0'.charCodeAt(0)) {
        zoomFactor = 1.0;
        webview.setZoom(zoomFactor);
    }
};

// Listen for webview load event
webview.addEventListener('contentload', function () {
    // Execute JS script within webview
    webview.executeScript({
        // Send a Chrome runtime message every time the keydown event is fired within webview
        code: `window.addEventListener('keydown', function (e) {
            chrome.runtime.sendMessage({ event: 'keydown', params: { ctrlKey: e.ctrlKey, metaKey: e.metaKey, altKey: e.altKey, keyCode: e.keyCode } });
        });`});
});

// Listen for Chrome runtime messages
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // Check for keydown event
        if (request.event === 'keydown') {
            // Invoke the local window's keydown event handler
            window.onkeydown(request.params);
        }
    }
);

function copyToClipboard(str, mimetype) {
    // Listen for 'oncopy' event
    document.oncopy = function (event) {
        event.clipboardData.setData(mimetype, str);
        event.preventDefault();
    };

    // Execute browser command 'Copy'
    document.execCommand("Copy", false, null);
}