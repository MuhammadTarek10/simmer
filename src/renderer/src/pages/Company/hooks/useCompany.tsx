import { AppDispatch, RootState } from '@/pages/store'
import { useDispatch, useSelector } from 'react-redux'
import { clearCurrentCompany, fetchCompanyById } from './company-slice'
import { useEffect, useMemo } from 'react'
import { CompanyDto } from '@shared/dtos/company.dto'
import { setLoading, setError, clearError } from '@/pages/Global/state/global-slice' // Import global state actions

export const useCompany = (id: string): CompanyDto | null => {
  const dispatch = useDispatch<AppDispatch>()

  const { data: company } = useSelector((state: RootState) => state.company.currentCompany)
  const error = useSelector((state: RootState) => state.global.error)

  useEffect(() => {
    if (!id) return

    const fetch = async () => {
      dispatch(setLoading(true))
      dispatch(clearError())

      try {
        await dispatch(fetchCompanyById(id)).unwrap()
      } catch (error: any) {
        dispatch(setError(error.message || 'Failed to fetch company data'))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetch()

    return () => {
      dispatch(clearCurrentCompany())
      dispatch(clearError())
    }
  }, [id, dispatch])

  if (error) {
    throw new Error(error)
  }

  return useMemo(() => company || null, [company])
}
