import { AppDispatch, RootState } from '@/pages/store'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCurrentCompany, fetchCompanies } from './company-slice'
import { setLoading, clearError, setError } from '@/pages/Global/state/global-slice'
import { CompanyDto } from '@shared/dtos/company.dto'

export const useCompanies = (): CompanyDto[] | null => {
  const dispatch = useDispatch<AppDispatch>()

  const { data: companies } = useSelector((state: RootState) => state.company.companies)
  const error = useSelector((state: RootState) => state.global.error)

  useEffect(() => {
    const fetch = async () => {
      dispatch(setLoading(true))
      dispatch(clearError())

      try {
        await dispatch(fetchCompanies()).unwrap()
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
  }, [dispatch])

  if (error) {
    throw new Error(error)
  }

  return useMemo(() => companies, [companies])
}
