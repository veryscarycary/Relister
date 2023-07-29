const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld(
  'scratchpad',
  {
    createNewPostingCL: (postInfo) => ipcRenderer.send('createNewPostingCL', postInfo),
    createNewPostingFB: (postInfo) => ipcRenderer.send('createNewPostingFB', postInfo),
    // content: ipcRenderer.invoke("loadContent"),
  }
)
