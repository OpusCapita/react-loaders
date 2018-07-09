import Promise from 'core-js/library/es6/promise';

// cache for loaded urls
const loadedScripts = [];

const notLoaded = url => loadedScripts.indexOf(url) === -1;

const getDOMNode = (url, sync) => {
  const DOMNode = document.createElement('script');
  DOMNode.src = url;
  if (sync) {
    DOMNode.async = false;
  }
  return DOMNode;
}

const markScriptAsLoaded = (src, callback) => _ => {
  // prevent non-unique urls caused by racing conditions
  if (notLoaded(src)) {
    loadedScripts.push(src);
  }
  callback();
}

const loadScript = DOMNode => new Promise((resolve, reject) => {
  DOMNode.addEventListener('load', markScriptAsLoaded(DOMNode.src, resolve));
  DOMNode.addEventListener('error', reject);
  document.head.appendChild(DOMNode);
});

export default class ScriptsLoader {
  constructor(urls = [], onSuccess, onFail, sync = false) {
    this.DOMNodes = urls.
      filter(notLoaded).
      map(url => getDOMNode(url, sync));

    Promise.
      all(this.DOMNodes.map(loadScript)).
      then(onSuccess).
      catch(onFail);
  }

  destroy() {
    this.DOMNodes.map(DOMNode => {
      document.head.removeChild(DOMNode);
    });
  }
}
