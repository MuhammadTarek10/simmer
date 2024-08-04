import { mockCards } from '@shared/mocks/dummy'
import { CardInfo } from '@shared/models'
import { defer, useLoaderData } from 'react-router-dom'

export async function cardDetailsLoader({ params }) {
  const { id } = params
  const card = mockCards.find((card) => card.id === id)

  return defer({ card: card })
}

const CardDetails = () => {
  const { card } = useLoaderData() as { card: CardInfo }
  return <div>{card.card_number}</div>
}
export default CardDetails
