import { useParams } from 'react-router-dom'
import { useCompany } from './hooks/useCompany'
import { CompanyDetails } from './components/CompanyDetails'

const CompanyDetailsPage = () => {
  const { id } = useParams()
  const company = useCompany(id!)

  return company && <CompanyDetails company={company} />
}

export default CompanyDetailsPage
