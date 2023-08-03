const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  createNewPostingCL: (postInfo) =>
    ipcRenderer.invoke('createNewPostingCL', postInfo),
  createNewPostingFB: (postInfo) =>
    ipcRenderer.invoke('createNewPostingFB', postInfo),
  relistActivePostingsCL: (priceDrop) =>
    ipcRenderer.invoke('relistActivePostingsCL', priceDrop),
  relistActivePostingsFB: (priceDrop) =>
    ipcRenderer.invoke('relistActivePostingsFB', priceDrop),
  saveCredentialsCL: (credentials) =>
    ipcRenderer.send('saveCredentialsCL', credentials),
  saveCredentialsFB: (credentials) =>
    ipcRenderer.send('saveCredentialsFB', credentials),
  saveFormValue: (fieldName, fieldValue) => ipcRenderer.send('saveEnvValue', fieldName, fieldValue),
  getSavedFormValues: () => ipcRenderer.invoke('getSavedFormValues'),
});
