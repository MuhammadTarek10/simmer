import { useCards } from './hooks/useCards'

const CardListPage = () => {
  const cards = useCards()

  return (
    cards && (
      <div>
        <h1>Cards List</h1>
        <ul>
          {cards.map((card) => (
            <li key={card.id}>{card.number}</li>
          ))}
        </ul>
      </div>
    )
  )
}

export default CardListPage
