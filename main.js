const electron = require('electron');
const path = require('path');

electron.app.whenReady().then(createWindow);

function createWindow() {
  const editorWindow = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'editor-preload.js'),
    },
  });

  editorWindow.loadFile('editor.html');
  editorWindow.webContents.toggleDevTools();

  // menu items:
  // - new, load, save, save as
  // - toggle dark mode (editor)
  // - save preview as pdf

  const [x, y] = editorWindow.getPosition();

  const previewWindow = new electron.BrowserWindow({
    parent: editorWindow,
    closable: false,
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preview-preload.js'),
    },
    x: x + 20,
    y: y + 20,
  });

  previewWindow.setMenu(null);
  previewWindow.loadFile('preview.html');
  previewWindow.webContents.toggleDevTools();

  editorWindow.webContents.on('ipc-message', (event, chan, ...args) => {
    const [src] = args;
    previewWindow.webContents.send('new-src', src);
  });
}
