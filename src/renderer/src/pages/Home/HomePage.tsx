import { CompanyController } from '@controllers/company.controller'
import { Button } from '@shadcn/ui/button'
import { columns } from '../Company/components/columns'
import { DataTable } from '@components/data-table'

const HomePage = () => {
  const handleClick = async () => {
    CompanyController.getCompanies()
  }

  return (
    <div className="container">
      <div className="center">
        <h1>Home Page</h1>
        <Button onClick={handleClick}>Click Me</Button>
      </div>
      <DataTable
        columns={columns}
        filters={['email', 'name', 'status']}
        data={[
          {
            id: '728ed52f',
            amount: 100,
            status: 'pending',
            name: 'Muhammad Tarek',
            email: 'x@example.com'
          },
          {
            id: '728ed52f',
            amount: 100,
            status: 'pending',
            name: 'Khaled',
            email: 'm@example.com'
          },
          {
            id: '728ed52f',
            amount: 100,
            status: 'pending',
            email: 'm@example.com'
          }
        ]}
      />
    </div>
  )
}

export default HomePage
