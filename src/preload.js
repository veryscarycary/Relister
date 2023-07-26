const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld(
  'scratchpad',
  {
    createNewPosting: (postInfo) => ipcRenderer.send('createNewPosting', postInfo),
    // content: ipcRenderer.invoke("loadContent"),
  }
)
