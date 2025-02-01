import { useCompanies } from './state/useCompanies'

const CompaniesListPage = () => {
  const companies = useCompanies()

  return (
    <div>
      <h1>Companies List</h1>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>{company.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default CompaniesListPage
