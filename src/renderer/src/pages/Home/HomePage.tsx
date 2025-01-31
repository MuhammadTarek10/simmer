import { DataTable } from '@components/data-table'
import { CompanyController } from '@/controllers/company.controller'
import { Button } from '@shadcn/ui/button'
import { useState } from 'react'
import { company_columns } from '../Company/components/company-columns'
import { customer_columns } from '../Customer/components/customer-columns'
import { CustomerController } from '@/controllers/customer.controller'
import { CardController } from '@/controllers/card.controller'
import { card_columns } from '../Card/components/card-columns'
import { Link } from 'react-router-dom'
import { CompanyDto } from '@shared/dtos/company.dto'
import { CustomerDto } from '@shared/dtos/customer.dto'
import { CardDto } from '@shared/dtos/card.dto'

const HomePage = () => {
  const [companies, setCompanies] = useState<CompanyDto[]>([])
  const [customers, setCustomers] = useState<CustomerDto[]>([])
  const [cards, setCards] = useState<CardDto[]>([])

  const getCompanies = async () => {
    const companies = await CompanyController.getCompanies()
    setCompanies(companies)
  }

  const getCustomers = async () => {
    const customers = await CustomerController.getCustomers()
    setCustomers(customers)
  }

  const getCards = async () => {
    const cards = await CardController.getCards()
    setCards(cards)
  }

  return (
    <div className="container">
      <div className="center">
        <h1>Home Page</h1>
        <div className="flex gap-16">
          <Button onClick={getCompanies}>Companies</Button>
          <Button onClick={getCustomers}>Customers</Button>
          <Button onClick={getCards}>Cards</Button>
          <Link to={'/companies/9fc94eb8-2366-40b8-b47a-dc3ef7ea9f32'}>
            <Button>Navigate to company</Button>
          </Link>
        </div>
      </div>
      <DataTable columns={company_columns} data={companies} filter="name" />
      <DataTable columns={customer_columns} data={customers} filter="fullname" />
      <DataTable columns={card_columns} data={cards} filter="number" />
    </div>
  )
}

export default HomePage
