import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { functionNames } from '@shared/constants'
import {
  AddCard,
  AddCompany,
  AddCustomer,
  AddInvoice,
  AddOffer,
  DeleteCard,
  DeleteCompany,
  DeleteCustomer,
  DeleteInvoice,
  GetCard,
  GetCards,
  GetCardsFromCompanyId,
  GetCardsFromCustomerId,
  GetCompanies,
  GetCompany,
  GetCustomer,
  GetCustomerFromInvoiceId,
  GetCustomers,
  GetInvoice,
  GetInvoices,
  GetList,
  GetOffers,
  GetUnOccupiedCards,
  RemoveCardFromCustomer,
  UpdateCard,
  UpdateCompany,
  UpdateCustomer,
  UpdateInvoice,
  UpdatePaymentInvoices
} from '@shared/types'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import {
  addCard,
  deleteCard,
  getCard,
  getCards,
  getCardsFromCompanyId,
  getCardsFromCustomerId,
  getUnOccupiedCards,
  updateCard
} from './lib/card.actions'
import {
  addCompany,
  deleteCompany,
  getCompanies,
  getCompany,
  updateCompany
} from './lib/company.actions'
import {
  addCustomer,
  deleteCustomer,
  getCustomer,
  getCustomerFromInvoiceId,
  getCustomers,
  removeCardFromCustomer,
  updateCustomer
} from './lib/customer.actions'
import {
  addInvoice,
  deleteInvoice,
  getInvoice,
  getInvoices,
  updateInvoice,
  updatePaymentInvoices
} from './lib/invoices.actions'
import { getLists } from './lib/list.actions'
import { addOffer, getOffers } from './lib/offers.actions'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // Open the DevTools.
  // if (is.dev) {
  //   mainWindow.webContents.openDevTools()
  // }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // * Company
  ipcMain.handle(functionNames.getCompanies, async (_, ...args: Parameters<GetCompanies>) =>
    getCompanies(...args)
  )
  ipcMain.handle(functionNames.getCompany, async (_, ...args: Parameters<GetCompany>) =>
    getCompany(...args)
  )
  ipcMain.handle(functionNames.addCompany, async (_, ...args: Parameters<AddCompany>) =>
    addCompany(...args)
  )
  ipcMain.handle(functionNames.updateCompany, async (_, ...args: Parameters<UpdateCompany>) =>
    updateCompany(...args)
  )
  ipcMain.handle(functionNames.deleteCompany, async (_, ...args: Parameters<DeleteCompany>) =>
    deleteCompany(...args)
  )

  // * Customer
  ipcMain.handle(functionNames.getCustomers, async (_, ...args: Parameters<GetCustomers>) =>
    getCustomers(...args)
  )
  ipcMain.handle(functionNames.getCustomer, async (_, ...args: Parameters<GetCustomer>) =>
    getCustomer(...args)
  )
  ipcMain.handle(
    functionNames.getCustomerFromInvoiceId,
    async (_, ...args: Parameters<GetCustomerFromInvoiceId>) => getCustomerFromInvoiceId(...args)
  )
  ipcMain.handle(functionNames.addCustomer, async (_, ...args: Parameters<AddCustomer>) =>
    addCustomer(...args)
  )
  ipcMain.handle(functionNames.updateCustomer, async (_, ...args: Parameters<UpdateCustomer>) =>
    updateCustomer(...args)
  )
  ipcMain.handle(functionNames.deleteCustomer, async (_, ...args: Parameters<DeleteCustomer>) =>
    deleteCustomer(...args)
  )
  ipcMain.handle(
    functionNames.removeCardFromCustomer,
    async (_, ...args: Parameters<RemoveCardFromCustomer>) => removeCardFromCustomer(...args)
  )

  // * Cards
  ipcMain.handle(functionNames.getCards, async (_, ...args: Parameters<GetCards>) =>
    getCards(...args)
  )
  ipcMain.handle(
    functionNames.getUnOccupiedCards,
    async (_, ...args: Parameters<GetUnOccupiedCards>) => getUnOccupiedCards(...args)
  )
  ipcMain.handle(functionNames.getCard, async (_, ...args: Parameters<GetCard>) => getCard(...args))
  ipcMain.handle(
    functionNames.getCardsFromCompanyId,
    async (_, ...args: Parameters<GetCardsFromCompanyId>) => getCardsFromCompanyId(...args)
  )
  ipcMain.handle(
    functionNames.getCardsFromCustomerId,
    async (_, ...args: Parameters<GetCardsFromCustomerId>) => getCardsFromCustomerId(...args)
  )

  ipcMain.handle(functionNames.addCard, async (_, ...args: Parameters<AddCard>) => addCard(...args))
  ipcMain.handle(functionNames.updateCard, async (_, ...args: Parameters<UpdateCard>) =>
    updateCard(...args)
  )
  ipcMain.handle(functionNames.deleteCard, async (_, ...args: Parameters<DeleteCard>) =>
    deleteCard(...args)
  )

  // * List
  ipcMain.handle(functionNames.getList, async (_, ...args: Parameters<GetList>) =>
    getLists(...args)
  )

  // * Invoices
  ipcMain.handle(
    functionNames.updatePaymentInvoices,
    async (_, ...args: Parameters<UpdatePaymentInvoices>) => updatePaymentInvoices(...args)
  )
  ipcMain.handle(functionNames.getInvoices, async (_, ...args: Parameters<GetInvoices>) =>
    getInvoices(...args)
  )
  ipcMain.handle(functionNames.getInvoice, async (_, ...args: Parameters<GetInvoice>) =>
    getInvoice(...args)
  )
  ipcMain.handle(functionNames.addInvoice, async (_, ...args: Parameters<AddInvoice>) =>
    addInvoice(...args)
  )
  ipcMain.handle(functionNames.updateInvoice, async (_, ...args: Parameters<UpdateInvoice>) =>
    updateInvoice(...args)
  )
  ipcMain.handle(functionNames.deleteInvoice, async (_, ...args: Parameters<DeleteInvoice>) =>
    deleteInvoice(...args)
  )

  // * Offers
  ipcMain.handle(functionNames.getOffers, async (_, ...args: Parameters<GetOffers>) =>
    getOffers(...args)
  )
  ipcMain.handle(functionNames.addOffer, async (_, ...args: Parameters<AddOffer>) =>
    addOffer(...args)
  )

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
