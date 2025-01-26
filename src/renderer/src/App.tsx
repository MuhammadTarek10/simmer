import '@assets/global.css'
import { InvoiceController } from './controllers/invoice.controller'
import { CompanyController } from './controllers/company.controller'
import { CardController } from './controllers/card.controller'
import { CustomerController } from './controllers/customer.controller'

function App(): JSX.Element {
  const getCompanies = async () => {
    const companies = await CompanyController.getCompanies()
    console.log(companies)
  }

  const getInvoices = async () => {
    const invoices = await InvoiceController.getInvoices()
    console.log(invoices)
  }

  const getCustomers = async () => {
    const customers = await CustomerController.getCustomers()
    console.log(customers)
  }

  const getCards = async () => {
    const cards = await CardController.getCards()
    console.log(cards)
  }

  return (
    <>
      <div className="text-4xl font-bold">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="flex justify-around gap-8 border border-gray-500 p-4 m-4">
          <button
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={getCompanies}
          >
            Get Companies
          </button>

          <button
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={getInvoices}
          >
            Get Invoices
          </button>

          <button
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={getCustomers}
          >
            Get Customers
          </button>

          <button
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={getCards}
          >
            Get Cards
          </button>
        </div>
      </div>
    </>
  )
}

export default App
