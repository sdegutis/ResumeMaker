const electron = require('electron');

electron.app.whenReady().then(() => {
  const win = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.webContents.toggleDevTools();

  win.loadFile('index.html');
});
