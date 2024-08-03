import { mockCompanies } from '../../../shared/mocks/dummy'

export const useCompany = () => {
  return {
    data: mockCompanies,
    error: null,
    isLoading: false
  }
}
