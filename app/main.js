const { app, BrowserWindow } = require('electron');
const path = require('path');
const MainWindow = require('./src/main');
const { autoUpdater } = require('electron-updater');

let mainWindow;

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

function createMainWindow() {
  mainWindow = new MainWindow();
}

function getCurrentVersion() {
  return '当前版本号：' + app.getVersion() + '。';
}

app.whenReady().then(() => {
  createMainWindow();

  // 应用程序被激活时，如果没有任意窗口，创建窗口
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });

  mainWindow.showUpdateMessage(getCurrentVersion() + '正在检查更新中...');
  autoUpdater.checkForUpdates().then((info) => {
    console.log('*123 checkForUpdates:', info);
    mainWindow.showUpdateMessage(getCurrentVersion() + '当前已是最新版本。');
  });
});

autoUpdater.on('update-available', (info) => {
  console.log('*123 update-available:', info);
  mainWindow.showUpdateMessage(getCurrentVersion() + '发现新版本，正在下载...');
  const pth = autoUpdater.downloadUpdate();
  mainWindow.showUpdateMessage(pth);
});

autoUpdater.on('update-not-available', (info) => {
  console.log('*123 update-not-available:', info);
  mainWindow.showUpdateMessage(getCurrentVersion() + '当前已是最新版本。');
});

autoUpdater.on('update-downloaded', (info) => {
  console.log('*123 update-downloaded:', info);
  mainWindow.showUpdateMessage(getCurrentVersion() + '下载完成，准备安装...');
});

autoUpdater.on('error', (error) => {
  mainWindow.showUpdateMessage(error);
});

process.on('uncaughtException', function (err) {
  console.log(err);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
