const electron = require('electron');
const path = require('path');

electron.app.whenReady().then(createWindow);

function createWindow() {
  const window = new electron.BrowserWindow({
    width: 800 + 900,
    height: 600,
  });

  const editorView = new electron.BrowserView({
    webPreferences: {
      preload: path.join(__dirname, 'editor-preload.js'),
    },
  });

  const previewView = new electron.BrowserView({
    webPreferences: {
      preload: path.join(__dirname, 'preview-preload.js'),
    },
  });

  window.addBrowserView(editorView);
  window.addBrowserView(previewView);

  const resize = () => {
    const [w, h] = window.getContentSize();

    const w2 = 900;
    const w1 = w - w2;

    editorView.setBounds({ x: 0, y: 0, width: w1, height: h });
    previewView.setBounds({ x: w1, y: 0, width: w2, height: h });
  };

  resize();
  window.on('resize', resize);

  editorView.webContents.loadFile('editor.html');
  previewView.webContents.loadFile('preview.html');

  // editorWindow.webContents.toggleDevTools();

  // menu items:
  // - new, load, save, save as
  // - toggle dark mode (editor)
  // - save preview as pdf

  previewView.webContents.toggleDevTools();

  editorView.webContents.on('ipc-message', (event, chan, ...args) => {
    const [src] = args;
    previewView.webContents.send('new-src', src);
  });
}
