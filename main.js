const electron = require('electron');

electron.app.whenReady().then(createWindow);

function createWindow() {
  const editorWindow = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  editorWindow.loadFile('editor.html');
  editorWindow.webContents.toggleDevTools();

  const [x, y] = editorWindow.getPosition();

  const previewWindow = new electron.BrowserWindow({
    parent: editorWindow,
    closable: false,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
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
