import { mockCards } from '@shared/mocks/dummy'
import { defer } from 'react-router-dom'

export async function cardsLoader() {
  return defer({ cards: mockCards })
}

const Cards = () => {
  return <div>Cards</div>
}
export default Cards
