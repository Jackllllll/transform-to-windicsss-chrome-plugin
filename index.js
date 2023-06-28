document.getElementById('myFeatureToggle').addEventListener('change', function(e) {
    chrome.storage.local.set({myFeatureEnabled: e.target.checked});
});

chrome.storage.local.get('myFeatureEnabled', function(data) {
    if (data.myFeatureEnabled) {
    // My feature is enabled, do something...
    } else {
    // My feature is disabled, do something else...
    }
});