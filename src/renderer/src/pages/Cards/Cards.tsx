import { cardsColumns } from '@/components/columns/cards-columns'
import SearchInput from '@/components/SearchInput'
import { DataTable } from '@/components/ui/data-table'
import { mockCards } from '@shared/mocks/dummy'
import { useEffect, useState } from 'react'
import { defer } from 'react-router-dom'

export async function cardsLoader() {
  return defer({ cards: mockCards })
}

const Cards = () => {
  const [search, setSearch] = useState('')
  const [cards, setCards] = useState(mockCards)
  useEffect(() => {
    if (search) {
      setCards(
        mockCards.filter((card) => card.card_number.toLowerCase().includes(search.toLowerCase()))
      )
    } else {
      setCards(mockCards)
    }
  }, [search])

  return (
    <div className="flex flex-col p-2 gap-4">
      <div className="flex gap-4 items-center">
        <h1 className="text-3xl font-bold ml-8">الخطوط</h1>
        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <DataTable data={cards} columns={cardsColumns} />
    </div>
  )
}
export default Cards
