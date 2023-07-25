const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld(
  'scratchpad',
  {
    createNewPosting: () => ipcRenderer.send('createNewPosting'),
    // content: ipcRenderer.invoke("loadContent"),
  }
)
