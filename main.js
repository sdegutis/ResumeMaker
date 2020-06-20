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

  previewWindow.loadFile('preview.html');
  previewWindow.webContents.toggleDevTools();
}
