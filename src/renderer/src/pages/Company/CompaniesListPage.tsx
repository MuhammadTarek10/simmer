import { useCompanies } from './hooks/useCompanies'

const CompaniesListPage = () => {
  const companies = useCompanies()

  return (
    companies && (
      <div>
        <h1>Companies List</h1>
        <ul>
          {companies.map((company) => (
            <li key={company.id}>{company.name}</li>
          ))}
        </ul>
      </div>
    )
  )
}

export default CompaniesListPage
