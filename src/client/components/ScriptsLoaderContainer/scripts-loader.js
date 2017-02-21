function getDOMNode(url) {
  let DOMNode = document.createElement('script');
  DOMNode.src = url;
  document.head.appendChild(DOMNode);
  return DOMNode;
}

function getLoaderPromise(DOMNode, resolve, reject) {
  return new Promise(function(resolve, reject) {
    DOMNode.addEventListener('load', resolve);
    DOMNode.addEventListener('error', reject);
  });
}

export default
function ScriptsLoader(urls = [], onSuccess, onFail) {
  this.DOMNodes = urls.map(url => getDOMNode(url));
  let promises = this.DOMNodes.map(DOMNode => getLoaderPromise(DOMNode, onSuccess, onFail));
  Promise.all(promises).then(onSuccess).catch(onFail);
}

ScriptsLoader.prototype.destroy = function(onSuccess, onFail) {
  this.DOMNodes.map(DOMNode => {
    DOMNode.removeEventListener('load', onSuccess);
    DOMNode.removeEventListener('error', onFail);
    document.head.removeChild(DOMNode);
  });
};
