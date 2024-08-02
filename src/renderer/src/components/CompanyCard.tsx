import { Company } from '@shared/models'

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <div>
      <h1>{company.name}</h1>
    </div>
  )
}
export default CompanyCard
