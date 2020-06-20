const path = require('path');
window.ipc = require('electron').ipcRenderer;
const amd = require('./node_modules/monaco-editor/min/vs/loader.js');

function uriFromPath(_path) {
  var pathName = path.resolve(_path).replace(/\\/g, '/');
  if (pathName.length > 0 && pathName.charAt(0) !== '/') {
    pathName = '/' + pathName;
  }
  return encodeURI('file://' + pathName);
}

amd.require.config({
  baseUrl: uriFromPath(path.join(__dirname, './node_modules/monaco-editor/min'))
});

// workaround monaco-css not understanding the environment
self.module = undefined;

amd.require(['vs/editor/editor.main'], () => {
  ready();
});
