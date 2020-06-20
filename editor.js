const path = require('path');
const ipc = require('electron').ipcRenderer;
const amd = require('./node_modules/monaco-editor/min/vs/loader.js');

const editorEl = document.getElementById('editor');
let editor;

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
  editor = monaco.editor.create(editorEl, {
    value: SAMPLE.trim(),
    language: 'html',
  });

  adjustSizes();
  window.onresize = () => adjustSizes();

  const sendNewSrc = () => ipc.send('src-changed', editor.getValue());
  sendNewSrc();
  editor.onDidChangeModelContent(() => sendNewSrc());
});

function adjustSizes() {
  editorEl.style.width = (window.innerWidth) + 'px';
  editorEl.style.height = (window.innerHeight) + 'px';
  editor.layout();
}

const SAMPLE = `
<style>b { color: red; }</style>
<b style="font-weight: bold">hello</b>
`;