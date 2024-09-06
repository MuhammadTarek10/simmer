import { cardsColumns } from '@/components/columns/cards-columns'
import SearchInput from '@/components/SearchInput'
import { DataTable } from '@/components/ui/data-table'
import { CardInfo } from '@shared/models'
import { useEffect, useState } from 'react'
import { defer, useLoaderData } from 'react-router-dom'

export async function cardsLoader() {
  const cards = await window.context.getCards()
  return defer({ cards: cards })
}

const Cards = () => {
  const { cards } = useLoaderData() as { cards: CardInfo[] }
  const [search, setSearch] = useState('')
  const [filteredCards, setCards] = useState(cards)
  useEffect(() => {
    if (search) {
      setCards(
        cards.filter((card) => card.card_number.toLowerCase().includes(search.toLowerCase()))
      )
    } else {
      setCards(cards)
    }
  }, [search])

  return (
    <div className="p-2">
      <div className="flex flex-col p-2 gap-4">
        <div className="flex gap-4 items-center">
          <h1 className="text-3xl font-bold">الخطوط</h1>
          <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <DataTable columns={cardsColumns} data={filteredCards} />
      </div>
    </div>
  )
}
export default Cards
