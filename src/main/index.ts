import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import {
  CreateCard,
  CreateCompany,
  CreateCustomer,
  CreateInvoice,
  DeleteCard,
  DeleteCompany,
  DeleteCustomer,
  DeleteInvoice,
  GenerateInvoices,
  GetCardById,
  GetCards,
  GetCardsByCompanyId,
  GetCardsByCustomerId,
  GetCompanies,
  GetCompanyById,
  GetCustomerById,
  GetCustomers,
  GetInvoiceById,
  GetInvoices,
  GetInvoicesByCardId,
  GetInvoicesByCustomerId,
  PayInvoice,
  PayPartialInvoice,
  TransferCard,
  UpdateCard,
  UpdateCompany,
  UpdateCustomer,
  UpdateInvoice
} from '@shared/constants/types'
import { di } from './services'
import { Communication } from '@shared/constants/communication'
import './start'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minWidth: 900,
    minHeight: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  // const splash = createCustomWindow()
  //
  // const splashScreenSrc = appackaged
  //   ? join(process.resourcesPath, 'splash', 'splash.html')
  //   : join(__dirname, '../../splash', 'splash.html')
  //
  // splash.loadFile(splashScreenSrc)
  //
  // mainWindow.on('ready-to-show', () => {
  //   checkUpdate().then((res) => {
  //     if (!res) {
  //       dialog
  //         .showMessageBox({
  //           type: 'error',
  //           title: 'حدث خطأ',
  //           message: 'هناك مشكلة، جرب مرة اخرى او تواصل مع المطور',
  //           buttons: ['OK']
  //         })
  //         .then((_) => {
  //           splash.close()
  //           app.quit()
  //         })
  //     } else {
  //       splash.close()
  //       mainWindow.show()
  //     }
  //   })
  // })
  //

  mainWindow.show()

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
  electronApp.setAppUserModelId('com.simmer')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  //  NOTE: Company
  ipcMain.handle(Communication.GET_COMPANIES, async (_, ...args: Parameters<GetCompanies>) =>
    di.companyService.getCompanies(...args)
  )

  ipcMain.handle(Communication.GET_COMPANY_BY_ID, async (_, ...args: Parameters<GetCompanyById>) =>
    di.companyService.getCompanyById(...args)
  )

  ipcMain.handle(Communication.CREATE_COMPANY, async (_, ...args: Parameters<CreateCompany>) =>
    di.companyService.createCompany(...args)
  )

  ipcMain.handle(Communication.UPDATE_COMPANY, async (_, ...args: Parameters<UpdateCompany>) =>
    di.companyService.updateCompany(...args)
  )

  ipcMain.handle(Communication.DELETE_COMPANY, async (_, ...args: Parameters<DeleteCompany>) =>
    di.companyService.deleteCompany(...args)
  )

  // NOTE: Card
  ipcMain.handle(Communication.GET_CARDS, async (_, ...args: Parameters<GetCards>) =>
    di.cardService.getCards(...args)
  )

  ipcMain.handle(Communication.GET_CARD_BY_ID, async (_, ...args: Parameters<GetCardById>) =>
    di.cardService.getCardById(...args)
  )

  ipcMain.handle(Communication.CREATE_CARD, async (_, ...args: Parameters<CreateCard>) =>
    di.cardService.createCard(...args)
  )

  ipcMain.handle(Communication.UPDATE_CARD, async (_, ...args: Parameters<UpdateCard>) =>
    di.cardService.updateCard(...args)
  )

  ipcMain.handle(Communication.DELETE_CARD, async (_, ...args: Parameters<DeleteCard>) =>
    di.cardService.deleteCard(...args)
  )

  ipcMain.handle(
    Communication.GET_CARDS_BY_CUSTOMER_ID,
    async (_, ...args: Parameters<GetCardsByCustomerId>) =>
      di.cardService.getCardsByCustomerId(...args)
  )

  ipcMain.handle(
    Communication.GET_CARDS_BY_COMPANY_ID,
    async (_, ...args: Parameters<GetCardsByCompanyId>) =>
      di.cardService.getCardsByCompanyId(...args)
  )

  // NOTE: Customer
  ipcMain.handle(Communication.GET_CUSTOMERS, async (_, ...args: Parameters<GetCustomers>) =>
    di.customerService.getCustomers(...args)
  )

  ipcMain.handle(
    Communication.GET_CUSTOMER_BY_ID,
    async (_, ...args: Parameters<GetCustomerById>) => di.customerService.getCustomerById(...args)
  )

  ipcMain.handle(Communication.CREATE_CUSTOMER, async (_, ...args: Parameters<CreateCustomer>) =>
    di.customerService.createCustomer(...args)
  )

  ipcMain.handle(Communication.UPDATE_CUSTOMER, async (_, ...args: Parameters<UpdateCustomer>) =>
    di.customerService.updateCustomer(...args)
  )

  ipcMain.handle(Communication.DELETE_CUSTOMER, async (_, ...args: Parameters<DeleteCustomer>) =>
    di.customerService.deleteCustomer(...args)
  )

  ipcMain.handle(Communication.TRANSFER_CARD, async (_, ...args: Parameters<TransferCard>) =>
    di.customerService.transferCard(...args)
  )

  // NOTE: Invoice
  ipcMain.handle(Communication.GET_INVOICES, async (_, ...args: Parameters<GetInvoices>) =>
    di.invoiceService.getInvoices(...args)
  )

  ipcMain.handle(Communication.GET_INVOICE_BY_ID, async (_, ...args: Parameters<GetInvoiceById>) =>
    di.invoiceService.getInvoiceById(...args)
  )

  ipcMain.handle(
    Communication.GET_INVOICES_BY_CARD_ID,
    async (_, ...args: Parameters<GetInvoicesByCardId>) =>
      di.invoiceService.getInvoiceByCardId(...args)
  )

  ipcMain.handle(
    Communication.GET_INVOICES_BY_CUSTOMER_ID,
    async (_, ...args: Parameters<GetInvoicesByCustomerId>) =>
      di.invoiceService.getInvoicesByCustomerId(...args)
  )

  ipcMain.handle(Communication.CREATE_INVOICE, async (_, ...args: Parameters<CreateInvoice>) =>
    di.invoiceService.createInvoice(...args)
  )

  ipcMain.handle(Communication.UPDATE_INVOICE, async (_, ...args: Parameters<UpdateInvoice>) =>
    di.invoiceService.updateInvoice(...args)
  )

  ipcMain.handle(Communication.DELETE_INVOICE, async (_, ...args: Parameters<DeleteInvoice>) =>
    di.invoiceService.deleteInvoice(...args)
  )

  ipcMain.handle(
    Communication.GENERATE_INVOICES,
    async (_, ...args: Parameters<GenerateInvoices>) => di.invoiceService.generateInvoices(...args)
  )

  ipcMain.handle(Communication.PAY_INVOICE, async (_, ...args: Parameters<PayInvoice>) =>
    di.invoiceService.payInvoice(...args)
  )

  ipcMain.handle(
    Communication.PAY_PARTIAL_INVOICE,
    async (_, ...args: Parameters<PayPartialInvoice>) =>
      di.invoiceService.payPartialInvoice(...args)
  )

  // TODO: File

  // TODO: Home

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
