var walker = new Walker(),
matchNumber = function(elem, contents) {
  var reg = numberPatterns(),
  match = {},
  anchor = null;

  if (contents.match(reg) !== null) {
    var matches = contents.match(reg);
    if (matches.length > 1) {
      match = {idx: 0, regex: reg};
      // Pass all matches within a section of text
      anchor = new c2canchor(contents, matches, match, elem.parent());
      anchor.format();
      anchor.inject();
    } else {
      match = {idx: 0, regex: reg};
      // Pass a single match.
      anchor = new c2canchor(contents, matches[0], match, elem.parent());
      anchor.format();
      anchor.inject();
    }
  }
};

if ($('meta[name="pagecode"]').length) {
  console.log("Matching disabled.");
} else {
  walker.walk(document.body);
  setInterval(function() {
     walker.walk(document.body);
  }, 1000);
  
  $(document).on('click', '#fdc2c', function(e) {
    e.preventDefault();
    var number = $(this).data('content');
    if (typeof number === 'string') {
      number = number.replace(/[^0-9]/gi, '');
    }
    chrome.runtime.sendMessage({ type: 'click2callRequest', phoneNumber: number}, function(response) { });
  });
}
