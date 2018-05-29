chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var xsrf = $('meta[name="csrf-token"]').attr('content');

  $.ajax({
    url: 'https://portal.fastdevice.net/calls',
    type: 'PUT',
    contentType: 'application/json',
    headers: {'X-CSRF-TOKEN': xsrf},
    data: JSON.stringify({'number': request.phoneNumber}),
    success: function(res) {
      chrome.runtime.sendMessage({ type: 'click2callResponse', callStatus: JSON.stringify(res) });
    },
    error: function(res) {
      chrome.runtime.sendMessage({ type: 'click2callResponse', callStatus: JSON.stringify(res) });
    }
  });
});
