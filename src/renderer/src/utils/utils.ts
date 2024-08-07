import { CardInfo } from '@shared/models'
import { DropDownOption } from '@shared/types'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractCompanyDetails(cards: CardInfo[]) {
  const phoneTotal = cards?.filter((card) => card.card_type === 'phone').length
  const phoneTotalBeforeVat = cards
    ?.filter((card) => card.card_type === 'phone')
    .map((card) => card.price_before_vat)
    .reduce((acc, curr) => acc + curr, 0)
  const phoneTotalAfterVat = cards
    ?.filter((card) => card.card_type === 'phone')
    .map((card) => card.price_after_vat)
    .reduce((acc, curr) => acc + curr, 0)
  const localTotal = cards?.filter((card) => card.card_type === 'local').length
  const localTotalBeforeVat = cards
    ?.filter((card) => card.card_type === 'local')
    .map((card) => card.price_before_vat)
    .reduce((acc, curr) => acc + curr, 0)
  const localTotalAfterVat = cards
    ?.filter((card) => card.card_type === 'local')
    .map((card) => card.price_after_vat)
    .reduce((acc, curr) => acc + curr, 0)
  const cardsTotal = cards?.length
  const moneyTotal = cards?.map((card) => card.price_after_vat).reduce((acc, curr) => acc + curr, 0)
  return {
    phoneTotal,
    phoneTotalBeforeVat,
    phoneTotalAfterVat,
    localTotal,
    localTotalBeforeVat,
    localTotalAfterVat,
    cardsTotal,
    moneyTotal
  }
}

export function convertMonthToArabic(month: string) {
  switch (month) {
    case 'January':
      return 'يناير'
    case 'February':
      return 'فبراير'
    case 'March':
      return 'مارس'
    case 'April':
      return 'أبريل'
    case 'May':
      return 'مايو'
    case 'June':
      return 'يونيو'
    case 'July':
      return 'يوليو'
    case 'August':
      return 'أغسطس'
    case 'September':
      return 'سبتمبر'
    case 'October':
      return 'أكتوبر'
    case 'November':
      return 'نوفمبر'
    case 'December':
      return 'ديسمبر'
    default:
      return ''
  }
}

export const convertCardsToSelectOptions = (cards: CardInfo[]): DropDownOption[] => {
  return cards.map((card) => ({
    name: card.card_number,
    value: card.id
  }))
}
