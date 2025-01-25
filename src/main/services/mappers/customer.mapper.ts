export class CustomerMapper {
  public static toDtos(customers: any): any {
    return customers.map((customer: any) => CustomerMapper.toDto(customer))
  }

  public static toDto(customer: any): any {
    return {
      id: customer.id,
      name: customer.name,
      company_id: customer.company_id
    }
  }

  public static toModel(customer: any): any {
    return {
      id: customer.id,
      name: customer.name,
      company_id: customer.company_id
    }
  }
}
