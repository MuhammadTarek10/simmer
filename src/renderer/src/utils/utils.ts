import { CardInfo, CompanyInfo } from '@shared/models'
import { DropDownOption } from '@shared/types'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractCompanyDetails(company: CompanyInfo) {
  const phoneTotal = company.cards?.filter((card) => card.card_type === 'phone').length
  const phoneTotalBeforeVat = company.cards
    ?.filter((card) => card.card_type === 'phone')
    .map((card) => card.price_before_vat)
    .reduce((acc, curr) => acc + curr, 0)
  const phoneTotalAfterVat = company.cards
    ?.filter((card) => card.card_type === 'phone')
    .map((card) => card.price_after_vat)
    .reduce((acc, curr) => acc + curr, 0)
  const localTotal = company.cards?.filter((card) => card.card_type === 'local').length
  const localTotalBeforeVat = company.cards
    ?.filter((card) => card.card_type === 'local')
    .map((card) => card.price_before_vat)
    .reduce((acc, curr) => acc + curr, 0)
  const localTotalAfterVat = company.cards
    ?.filter((card) => card.card_type === 'local')
    .map((card) => card.price_after_vat)
    .reduce((acc, curr) => acc + curr, 0)
  const cardsTotal = company.cards?.length
  const moneyTotal = company.cards
    ?.map((card) => card.price_after_vat)
    .reduce((acc, curr) => acc + curr, 0)
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
