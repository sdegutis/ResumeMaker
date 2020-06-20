const ipc = require('electron').ipcRenderer;

ipc.on('new-src', (event, src) => {
  console.log('got', src);
  document.getElementById('root').innerHTML = src;
});
