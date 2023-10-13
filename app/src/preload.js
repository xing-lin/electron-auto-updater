const { contextBridge, ipcRenderer } = require('electron');

const bridge = {
  updateMessage: (callback) => ipcRenderer.on('updateMessage', callback),
};

contextBridge.exposeInMainWorld('bridge', bridge);
