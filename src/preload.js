const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld('scratchpad', {
  createNewPostingCL: (postInfo) =>
    ipcRenderer.send('createNewPostingCL', postInfo),
  createNewPostingFB: (postInfo) =>
    ipcRenderer.send('createNewPostingFB', postInfo),
  relistActivePostingsCL: (priceDrop) =>
    ipcRenderer.send('relistActivePostingsCL', priceDrop),
  relistActivePostingsFB: (priceDrop) =>
    ipcRenderer.send('relistActivePostingsFB', priceDrop),
  saveCredentialsCL: (credentials) =>
    ipcRenderer.send('saveCredentialsCL', credentials),
  saveCredentialsFB: (credentials) =>
    ipcRenderer.send('saveCredentialsFB', credentials),
  // content: ipcRenderer.invoke("loadContent"),
});
