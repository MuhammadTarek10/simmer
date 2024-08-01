import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new Error('The preload script should be context isolated')
}

try {
  contextBridge.exposeInMainWorld('context', {
    // TODO: Add your APIs here
  })
} catch (e) {
  console.error(e)
}
