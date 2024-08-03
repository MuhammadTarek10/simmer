import { CompanyInfo } from '@shared/models'
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
