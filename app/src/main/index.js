const { BrowserWindow, ipcMain } = require('electron');

const path = require('path');

class MainWindow {
  window = null;

  windowSettings = {
    width: 1200,
    height: 900,
    maximized: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload.js'),
    },
  };

  constructor() {
    this.window = new BrowserWindow(this.windowSettings);

    this.window.once('ready-to-show', () => {
      this.window.show();

      if (this.windowSettings.maximized) {
        this.window.maximize();
      }
    });

    this.handleMessage();

    const webContents = this.window.webContents;

    webContents.openDevTools({ mode: 'right' });
    this.window.loadFile(path.join(__dirname, './index.html'));
  }

  showUpdateMessage(message) {
    this.window.webContents.send('updateMessage', message);
  }

  close() {
    this.window.close();
    ipcMain.removeListener();
  }

  hide() {
    this.window.hide();
  }

  handleMessage() {}
}

module.exports = MainWindow;
