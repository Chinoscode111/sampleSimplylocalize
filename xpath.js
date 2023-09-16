const elementsWithTextXPaths = [];

function collectElementXPaths(node, currentPath) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    // Add the current node's tag name to the XPath
    currentPath += '/' + node.tagName.toLowerCase();
    const index = Array.from(node.parentNode.childNodes).filter(e => e.tagName === node.tagName).indexOf(node) + 1;
    currentPath += '[' + index + ']';

    // Check if the node has text content
    if (node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE) {
      const text = node.childNodes[0].textContent.trim();
      if (text.length > 0) {
        elementsWithTextXPaths.push({ element: node, xpath: currentPath });
      }
    }

    // Recursively process child nodes
    for (let i = 0; i < node.childNodes.length; i++) {
      collectElementXPaths(node.childNodes[i], currentPath);
    }
  }
}

// Start the traversal from the root of the document
collectElementXPaths(document.documentElement, '');

// Print the collected XPaths
elementsWithTextXPaths.forEach(item => {
  console.log(`XPath: ${item.xpath}`);
});
