import { useParams } from 'react-router-dom'
import { useCompany } from './state/useCompany'
import { CompanyDetails } from './components/CompanyDetails'

const CompanyDetailsPage = () => {
  const { id } = useParams()
  const { company, error } = useCompany(id!)

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    )
  }

  return company ? <CompanyDetails company={company} /> : <></>
}

export default CompanyDetailsPage
