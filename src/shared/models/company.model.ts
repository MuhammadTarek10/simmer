import { Card } from './card.model'

export interface Company {
  id?: string
  name: string
  pay_date: Date
  phone?: string
  comment?: string
  cards?: Card[]
}
