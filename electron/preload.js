// preload can be used to expose safe APIs to renderer if needed
const { contextBridge } = require('electron');
contextBridge.exposeInMainWorld('electron', {});
