import '@assets/global.css'
import { CompanyController } from './controllers/company.controller'

function App(): JSX.Element {
  const getCompanies = async () => {
    const companies = await CompanyController.getCompanies()
    console.log(companies)
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
        <button onClick={getCompanies}>Get Companies</button>
      </div>
    </>
  )
}

export default App
