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

export const convertCardsToSelectOptions = (cards: CardInfo[]): DropDownOption[] => {
  return cards.map((card) => ({
    name: card.card_number,
    value: card.id
  }))
}

export const convertMonthToArabic = (month: string) => {
  switch (month) {
    case '1':
      return 'يناير'
    case '2':
      return 'فبراير'
    case '3':
      return 'مارس'
    case '4':
      return 'ابريل'
    case '5':
      return 'مايو'
    case '6':
      return 'يونيو'
    case '7':
      return 'يوليو'
    case '8':
      return 'اغسطس'
    case '9':
      return 'سبتمبر'
    case '10':
      return 'اكتوبر'
    case '11':
      return 'نوفمبر'
    case '12':
      return 'ديسمبر'
    default:
      return ''
  }
}
