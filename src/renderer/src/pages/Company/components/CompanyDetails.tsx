import { CompanyDto } from '@shared/dtos/company.dto'

export const CompanyDetails = ({ company }: { company: CompanyDto }) => (
  <div>
    <h1>Company Details</h1>
    <p>Name: {company.name}</p>
    <p>Phone: {company.phone}</p>
    <p>Cards: {company.cards?.length}</p>
  </div>
)
