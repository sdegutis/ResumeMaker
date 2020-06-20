const ipc = require('electron').ipcRenderer;

ipc.on('new-src', (event, src) => {
  document.getElementById('root').innerHTML = src;
});
