function Walker() {
  this.walk = function(node) {
    var child, next,
    id = $(node).parent().attr('id'),
    elemName = node.nodeName.toLowerCase(),
    self = this;

    if (id === 'fdc2c' || elemName === 'script' || elemName === 'iframe' || elemName === 'a') return;

    switch (node.nodeType) {
      case 1:
      case 9:
      case 11:
        child = node.firstChild;
        while(child) {
          next = child.nextSibling;
          self.walk(child);
          child = next;
        }
        break;
      case 3:
        matchNumber($(node), node.nodeValue);
        break;
    }
  };
}
