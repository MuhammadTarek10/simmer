import { AppDispatch, RootState } from '@/pages/store'
import { useDispatch, useSelector } from 'react-redux'
import { clearCurrentCompany, fetchCompanyById } from './company-slice'
import { useEffect, useMemo } from 'react'
import { CompanyDto } from '@shared/dtos/company.dto'
import { useDebounce } from 'use-debounce'
import { setLoading, setError, clearError } from '@/pages/Global/state/global-slice' // Import global state actions

export const useCompany = (id: string): CompanyDto | null => {
  const dispatch = useDispatch<AppDispatch>()
  const [debouncedId] = useDebounce(id, 500) // Debounce the ID to avoid excessive API calls

  // Select company data and global state from the Redux store
  const { data: company } = useSelector((state: RootState) => state.company.currentCompany)
  const error = useSelector((state: RootState) => state.global.error)

  useEffect(() => {
    if (!debouncedId) return

    const fetchCompany = async () => {
      dispatch(setLoading(true))
      dispatch(clearError())

      try {
        await dispatch(fetchCompanyById(debouncedId)).unwrap()
      } catch (error: any) {
        dispatch(setError(error.message || 'Failed to fetch company data'))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchCompany()

    return () => {
      dispatch(clearCurrentCompany())
      dispatch(clearError())
    }
  }, [debouncedId, dispatch])

  if (error) {
    throw new Error(error)
  }

  // Memoize the result to prevent unnecessary re-renders
  return useMemo(() => company || null, [company])
}
