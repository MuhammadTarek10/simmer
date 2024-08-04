import { contextBridge, ipcRenderer } from 'electron'
import { AddCompany, DeleteCompany, GetCompanies, GetCompany, UpdateCompany } from '../shared/types'

if (!process.contextIsolated) {
  throw new Error('The preload script should be context isolated')
}

try {
  contextBridge.exposeInMainWorld('context', {
    getCompanies: (...args: Parameters<GetCompanies>) =>
      ipcRenderer.invoke('getCompanies', ...args),
    getCompany: (...args: Parameters<GetCompany>) => ipcRenderer.invoke('getCompany', ...args),
    addCompany: (...args: Parameters<AddCompany>) => ipcRenderer.invoke('addCompany', ...args),
    updateCompany: (...args: Parameters<UpdateCompany>) =>
      ipcRenderer.invoke('updateCompany', ...args),
    deleteCompany: (...args: Parameters<DeleteCompany>) =>
      ipcRenderer.invoke('deleteCompany', ...args)
  })
} catch (e) {
  console.error(e)
}
