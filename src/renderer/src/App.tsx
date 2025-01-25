import '@assets/global.css'
import { InvoiceController } from './controllers/invoice.controller'

function App(): JSX.Element {
  const handleClick = async () => {
    await InvoiceController.getInvoices()
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
        <button
          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClick}
        >
          Get Companies
        </button>
      </div>
    </>
  )
}

export default App
