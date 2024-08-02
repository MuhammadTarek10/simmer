import { mockCustomers } from '../mocks/dummy'

export const useCustomer = () => {
  return {
    data: mockCustomers,
    isLoading: false,
    error: null
  }
}
