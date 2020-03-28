const rule1 = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {
        urlPrefix: 'https://www.youtube.com/watch?v=',
        schemes: ['https']
      }
    })
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()]
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    console.log('ok');
    chrome.declarativeContent.onPageChanged.addRules([rule1]);
  });

  // listening to message from popup.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    const { type, payload } = request;

    // query the active tab and forward the message
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      // response from content.js
      chrome.tabs.sendMessage(tabs[0].id, { type, payload }, response => {
        sendResponse(response);
      });
    });

    return true;
  });
});
