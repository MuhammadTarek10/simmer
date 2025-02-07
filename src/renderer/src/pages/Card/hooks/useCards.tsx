import { AppDispatch, RootState } from '@/pages/store'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, clearError, setError } from '@/pages/Global/state/global-slice'
import { clearCurrentCard, fetchCards } from './card-slice'
import { CardDto } from '@shared/dtos/card.dto'

export const useCards = (): CardDto[] | null => {
  const dispatch = useDispatch<AppDispatch>()

  const { data: cards } = useSelector((state: RootState) => state.card.cards)
  const error = useSelector((state: RootState) => state.global.error)

  useEffect(() => {
    const fetch = async () => {
      dispatch(setLoading(true))
      dispatch(clearError())

      try {
        await dispatch(fetchCards()).unwrap()
      } catch (error: any) {
        dispatch(setError(error.message || 'Failed to fetch company data'))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetch()

    return () => {
      dispatch(clearCurrentCard())
      dispatch(clearError())
    }
  }, [dispatch])

  if (error) {
    throw new Error(error)
  }

  return useMemo(() => cards, [cards])
}
