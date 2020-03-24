import io from 'socket.io-client';

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
  const socket = io('http://localhost:3000/');
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    console.log('ok');
    chrome.declarativeContent.onPageChanged.addRules([rule1]);
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log({ request, sender });

    const { message, payload } = request;
    const username = 'renato';
    socket.emit(request.message, payload);

    socket.on('created', message => {
      sendResponse(message);
    });

    socket.on('joined', message => {
      sendResponse(message);
    });
    return true;
  });
  // chrome.browserAction.onClicked.addListener(tab => {

  // });
});
