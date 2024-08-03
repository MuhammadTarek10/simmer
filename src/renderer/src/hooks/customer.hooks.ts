import { mockCustomers } from '../../../shared/mocks/dummy'

export const useCustomer = () => {
  return {
    data: mockCustomers,
    isLoading: false,
    error: null
  }
}
