var appConfig = {
    "hostname": "icloud.com",
    "userAgent": "",
    "chromeAppWindow": {
        "id": "embed",
        "frame": {
            "type": "chrome",
            "color": "#007aff"
        },
        "innerBounds": {
            "width": 1180,
            "height": 900
        }
    }
};

// Listen for the app launching then create the window
chrome.app.runtime.onLaunched.addListener(function () {
    runApp();
});

// Listen for a restart then recreate the window
chrome.app.runtime.onRestarted.addListener(function () {
    runApp();
});

// Create the window
function runApp() {
    chrome.app.window.create('html/embed.html', appConfig.chromeAppWindow, onWindowLoaded());
    // Apply reduced zoom factor to fix goofy Apple default value
    webview.setZoom("0.8");
}

function onWindowLoaded(popup) {
    return function (win) {
        // On window loaded event
        win.contentWindow.onload = function () {
            // Get webview 
            var webview = win.contentWindow.document.getElementById('webview');

            // Override default user agent if provided
            if (appConfig.userAgent) {
                webview.setUserAgentOverride(appConfig.userAgent);
            }

            // Sign up for 'permissionrequest' event
            webview.addEventListener('permissionrequest', function (e) {
                // Allow all permission requests
                e.request.allow();
            });

            // Sign up for 'newwindow' event
            // Emitted when a target='_blank' link is clicked within the webview
            webview.addEventListener('newwindow', function (e) {
                // Parse target window URL to extract hostname
                var parsedUrl = document.createElement('a');
                parsedUrl.href = e.targetUrl;

                if (parsedUrl.hostname.includes(appConfig.hostname)) {
                    return chrome.app.window.create('html/embed.html', { frame: { type: 'chrome' }, innerBounds: appConfig.chromeAppWindow.innerBounds }, onWindowLoaded(e));
                }

                // Open the link in a new browser tab/window
                win.contentWindow.open(e.targetUrl);
            });
        };
    };
}
