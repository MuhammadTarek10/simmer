import { CardInfo } from '@shared/models'
import { defer, useLoaderData } from 'react-router-dom'
import { getCard } from '../../repositories/card.repository'

export async function cardDetailsLoader({ params }) {
  const { id } = params
  const card = await getCard(id)

  return defer({ card: card })
}

const CardDetails = () => {
  const { card } = useLoaderData() as { card: CardInfo }
  return <div>{card.card_number}</div>
}
export default CardDetails
