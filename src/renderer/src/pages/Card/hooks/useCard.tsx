import { AppDispatch, RootState } from '@/pages/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { setLoading, setError, clearError } from '@/pages/Global/state/global-slice'
import { CardDto } from '@shared/dtos/card.dto'
import { clearCurrentCard, fetchCardById } from './card-slice'

export const useCard = (id: string): CardDto | null => {
  const dispatch = useDispatch<AppDispatch>()

  const { data: card } = useSelector((state: RootState) => state.card.currentCard)
  const error = useSelector((state: RootState) => state.global.error)

  useEffect(() => {
    if (!id) return

    const fetch = async () => {
      dispatch(setLoading(true))
      dispatch(clearError())

      try {
        await dispatch(fetchCardById(id)).unwrap()
      } catch (error: any) {
        dispatch(setError(error.message || 'Failed to fetch card data'))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetch()

    return () => {
      dispatch(clearCurrentCard())
      dispatch(clearError())
    }
  }, [id, dispatch])

  if (error) {
    throw new Error(error)
  }

  return useMemo(() => card || null, [card])
}
