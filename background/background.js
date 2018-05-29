chrome.notifications.onButtonClicked.addListener(function(id, idx) {
  chrome.tabs.create({ url: 'https://portal.fastdevice.net/' });
});

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    var phone = null,
    clickResponse = null,
    status = null;

    if (message.type === 'click2callRequest') {
      phone = message.phoneNumber;

      chrome.tabs.query({url: '*://portal.fastdevice.net/*'}, function(tabs) {
        if (tabs.length === 0) {
          var opt = {
            type: "basic",
            title: "Error",
            message: 'No Portal window open.  Please login to our Portal to place a call.',
            iconUrl: '../images/icon-128.png',
            buttons: [
              { title: 'Open Portal' }
            ]
          };
          var notification = chrome.notifications.create(null, opt, null);
          notification.show();

        } else {
          chrome.tabs.sendMessage(tabs[0].id, {phoneNumber: phone}, function(response) { });
        }
      });
    } else if(message.type === 'click2callResponse') {
      status = JSON.parse(message.callStatus);

      if (status.status !== 'ok') {
        var notification = new Notification('Error',
          { icon: '../images/icon-128.png',
            body: 'Click2Call failed.'
          });
        notification.show();
      }
    }
  }
);
