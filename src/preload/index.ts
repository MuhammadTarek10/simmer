import { contextBridge, ipcRenderer } from 'electron'
import { GetCompanies } from '@shared/types'

if (!process.contextIsolated) {
  throw new Error('The preload script should be context isolated')
}

try {
  contextBridge.exposeInMainWorld('context', {
    // * Company
    getCompanies: (...args: Parameters<GetCompanies>) => ipcRenderer.invoke('getCompanies', ...args)
  })
} catch (error) {
  console.error(error)
}
