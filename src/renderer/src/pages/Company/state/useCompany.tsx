import { AppDispatch, RootState } from '@/pages/store'
import { useDispatch, useSelector } from 'react-redux'
import { clearCurrentCompany, fetchCompanyById } from './company-slice'
import { useEffect, useMemo } from 'react'
import { CompanyDto } from '@shared/dtos/company.dto'
import { useDebounce } from 'use-debounce'
import { setLoading, setError, clearError } from '@/pages/Global/state/global-slice' // Import global state actions

interface UseCompanyResult {
  company: CompanyDto | null
  isLoading: boolean
  error: string | null
}

export const useCompany = (id: string): UseCompanyResult => {
  const dispatch = useDispatch<AppDispatch>()
  const [debounced_id] = useDebounce(id, 500) // Debounce the ID to avoid excessive API calls

  // Select company data and global state from the Redux store
  const { data: company } = useSelector((state: RootState) => state.company.currentCompany)
  const { isLoading, error } = useSelector((state: RootState) => state.global)

  useEffect(() => {
    if (!debounced_id) return

    const fetchCompany = async () => {
      dispatch(setLoading(true)) // Set global loading state
      dispatch(clearError()) // Clear any previous errors

      try {
        await dispatch(fetchCompanyById(debounced_id)).unwrap()
      } catch (error: any) {
        dispatch(setError(error.message || 'Failed to fetch company data')) // Set global error state
      } finally {
        dispatch(setLoading(false)) // Clear global loading state
      }
    }

    fetchCompany()

    return () => {
      dispatch(clearCurrentCompany()) // Clear company data on unmount
      dispatch(clearError()) // Clear any errors on unmount
    }
  }, [debounced_id, dispatch])

  // Memoize the result to prevent unnecessary re-renders
  return useMemo(() => ({ company, isLoading, error }), [company, isLoading, error])
}
