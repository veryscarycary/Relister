const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld(
  'scratchpad',
  {
    createNewPostingCL: (postInfo) => ipcRenderer.send('createNewPostingCL', postInfo),
    // content: ipcRenderer.invoke("loadContent"),
  }
)
