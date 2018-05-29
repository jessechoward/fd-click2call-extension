function c2canchor(domString, match, patternMatched, parent) {
  this.domString = domString;
  this.match = match;
  this.formatted = '';
  this.patternMatched = patternMatched;
  this.parent = parent;

  this.format = function() {
    var parts = '';
    var p1 = "<a id='fdc2c' href='#' data-content='";
    var p2 = "' title='place call'>";
    var p3 = "</a>";

    if (Array.isArray(this.match)) {
      this.formatted = this.domString;
      for (var i = 0; i < this.match.length; i++) {
        // Concatenate the click2call link.
        var concatenated = parts.concat(p1, this.match[i], p2, this.match[i], p3);
        // Replace the phone number in the DOM with the concatenated link and return it as the
        // formatted anchor.
        this.formatted = this.formatted.replace(this.match[i], concatenated);
      }
    } else {
      // Concatenate the click2call link.
      var concatenated = parts.concat(p1, this.match, p2, this.match, p3);
      // Replace the phone number in the DOM with the concatenated link and return it as the
      // formatted anchor.
      this.formatted = this.domString.replace(this.match, concatenated);
    }

    return this.formatted;
  };

  this.inject = function() {
    // If the text node matched is a direct child of the body,
    // Do not inject, doing this to avoid removing all content from the body.
    if (this.parent[0].nodeName.toLowerCase() === 'body') {
      return;
    }
    $(this.parent).html(this.formatted);
  };

  this.toString = function() {
    return this.formatted;
  };
}
