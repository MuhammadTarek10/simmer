import { CardInfo, Company, Customer, ListData, OfferInfo } from '@shared/models'
import { CompanyInfo } from '../models'

export const mockCompanies: Company[] = [
  {
    id: '24124',
    name: 'Company 1'
  },
  {
    id: '24125',
    name: 'Company 2'
  },
  {
    id: '24126',
    name: 'Company 3'
  },
  {
    id: '24127',
    name: 'Company 4'
  },
  {
    id: '24128',
    name: 'Company 5'
  },
  {
    id: '24129',
    name: 'Company 6'
  },
  {
    id: '24130',
    name: 'Company 7'
  },
  {
    id: '24131',
    name: 'Company 8'
  },
  {
    id: '24132',
    name: 'Company 9'
  },
  {
    id: '24133',
    name: 'Company 10'
  },
  {
    id: '24134',
    name: 'Company 11'
  },
  {
    id: '24135',
    name: 'Company 12'
  },
  {
    id: '24136',
    name: 'Company 13'
  },
  {
    id: '24137',
    name: 'Company 14'
  },
  {
    id: '24138',
    name: 'Company 15'
  },
  {
    id: '24139',
    name: 'Company 16'
  },
  {
    id: '24140',
    name: 'Company 17'
  },
  {
    id: '24141',
    name: 'Company 18'
  },
  {
    id: '24142',
    name: 'Company 19'
  },
  {
    id: '24143',
    name: 'Company 20'
  },
  {
    id: '24144',
    name: 'Company 21'
  },
  {
    id: '24145',
    name: 'Company 22'
  },
  {
    id: '24146',
    name: 'Company 23'
  },
  {
    id: '24147',
    name: 'Company 24'
  },
  {
    id: '24148',
    name: 'Company 25'
  },
  {
    id: '24149',
    name: 'Company 26'
  },
  {
    id: '24150',
    name: 'Company 27'
  }
]

export const mockCustomers: Customer[] = [
  {
    id: '24124',
    name: 'Customer 1'
  },
  {
    id: '24125',
    name: 'Customer 2'
  },
  {
    id: '24126',
    name: 'Customer 3'
  },
  {
    id: '24127',
    name: 'Customer 4'
  },
  {
    id: '24128',
    name: 'Customer 5'
  },
  {
    id: '24129',
    name: 'Customer 6'
  },
  {
    id: '24130',
    name: 'Customer 7'
  },
  {
    id: '24131',
    name: 'Customer 8'
  },
  {
    id: '24132',
    name: 'Customer 9'
  },
  {
    id: '24133',
    name: 'Customer 10'
  },
  {
    id: '24134',
    name: 'Customer 11'
  },
  {
    id: '24135',
    name: 'Customer 12'
  },
  {
    id: '24136',
    name: 'Customer 13'
  },
  {
    id: '24137',
    name: 'Customer 14'
  },
  {
    id: '24138',
    name: 'Customer 15'
  },
  {
    id: '24139',
    name: 'Customer 16'
  },
  {
    id: '24140',
    name: 'Customer 17'
  },
  {
    id: '24141',
    name: 'Customer 18'
  },
  {
    id: '24142',
    name: 'Customer 19'
  },
  {
    id: '24143',
    name: 'Customer 20'
  },
  {
    id: '24144',
    name: 'Customer 21'
  },
  {
    id: '24145',
    name: 'Customer 22'
  },
  {
    id: '24146',
    name: 'Customer 23'
  },
  {
    id: '24147',
    name: 'Customer 24'
  },
  {
    id: '24148',
    name: 'Customer 25'
  },
  {
    id: '24149',
    name: 'Customer 26'
  }
]

export const mockCards: CardInfo[] = [
  {
    id: '24124',
    card_number: 'Card 1',
    company_name: 'Company 1',
    offer_name: 'Offer 1',
    price_before_vat: 200,
    price_after_vat: 100,
    card_type: 'phone'
  },
  {
    id: '24125',
    card_number: 'Card 2',
    company_name: 'Company 2',
    offer_name: 'Offer 2',
    price_before_vat: 200,
    price_after_vat: 200,
    card_type: 'phone'
  },
  {
    id: '24126',
    card_number: 'Card 3',
    company_name: 'Company 3',
    offer_name: 'Offer 3',
    price_before_vat: 200,
    price_after_vat: 300,
    card_type: 'phone'
  },
  {
    id: '24127',
    card_number: 'Card 4',
    company_name: 'Company 4',
    offer_name: 'Offer 4',
    price_before_vat: 200,
    price_after_vat: 400,
    card_type: 'phone'
  },
  {
    id: '24128',
    card_number: 'Card 5',
    company_name: 'Company 5',
    offer_name: 'Offer 5',
    price_before_vat: 200,
    price_after_vat: 500,
    card_type: 'phone'
  },
  {
    id: '24129',
    card_number: 'Card 6',
    company_name: 'Company 6',
    offer_name: 'Offer 6',
    price_before_vat: 200,
    price_after_vat: 600,
    card_type: 'phone'
  },
  {
    id: '24130',
    card_number: 'Card 7',
    company_name: 'Company 7',
    offer_name: 'Offer 7',
    price_before_vat: 200,
    price_after_vat: 700,
    card_type: 'phone'
  },
  {
    id: '24131',
    card_number: 'Card 8',
    company_name: 'Company 8',
    offer_name: 'Offer 8',
    price_before_vat: 200,
    price_after_vat: 800,
    card_type: 'phone'
  },
  {
    id: '24132',
    card_number: 'Card 9',
    company_name: 'Company 9',
    offer_name: 'Offer 9',
    price_before_vat: 200,
    price_after_vat: 900,
    card_type: 'phone'
  },
  {
    id: '24133',
    card_number: 'Card 10',
    company_name: 'Company 10',
    offer_name: 'Offer 10',
    price_before_vat: 200,
    price_after_vat: 1000,
    card_type: 'phone'
  },
  {
    id: '24134',
    card_number: 'Card 11',
    company_name: 'Company 11',
    offer_name: 'Offer 11',
    price_before_vat: 200,
    price_after_vat: 1100,
    card_type: 'phone'
  }
]

export const mockCompaniesDetails: CompanyInfo = {
  id: '24124',
  name: 'Company 1',
  phone: '123456789',
  invoice_date: '2021-01-01',
  comment: 'Comment 1',
  cards: mockCards
}

export const mockListData: ListData[] = [
  {
    month: 'January',
    info: [
      {
        customer_id: '24124',
        name: 'Customer 1',
        card_number: 'Card 1',
        company_name: 'Company 1',
        offer_name: 'Offer 1',
        invoice_date: '2021-01-01',
        paid: 100,
        remaining: 200,
        comment: 'Comment 1'
      },
      {
        customer_id: '24125',
        name: 'Customer 2',
        card_number: 'Card 2',
        company_name: 'Company 2',
        offer_name: 'Offer 2',
        invoice_date: '2021-01-01',
        paid: 200,
        remaining: 200,
        comment: 'Comment 2'
      },
      {
        customer_id: '24126',
        name: 'Customer 3',
        card_number: 'Card 3',
        company_name: 'Company 3',
        offer_name: 'Offer 3',
        invoice_date: '2021-01-01',
        paid: 300,
        remaining: 300,
        comment: 'Comment 3'
      },
      {
        customer_id: '24127',
        name: 'Customer 4',
        card_number: 'Card 4',
        company_name: 'Company 4',
        offer_name: 'Offer 4',
        invoice_date: '2021-01-01',
        paid: 400,
        remaining: 500,
        comment: 'Comment 4'
      },
      {
        customer_id: '24128',
        name: 'Customer 5',
        card_number: 'Card 5',
        company_name: 'Company 5',
        offer_name: 'Offer 5',
        invoice_date: '2021-01-01',
        paid: 500,
        remaining: 500,
        comment: 'Comment 5'
      }
    ]
  },
  {
    month: 'February',
    info: mockCards.map((card) => ({
      customer_id: '24125',
      name: 'Customer 2',
      card_number: card.card_number,
      company_name: card.company_name,
      offer_name: card.offer_name,
      invoice_date: '2021-02-01',
      paid: 200,
      remaining: 200,
      comment: 'Comment 2'
    }))
  },
  {
    month: 'March',
    info: mockCards.map((card) => ({
      customer_id: '24126',
      name: 'Customer 3',
      card_number: card.card_number,
      company_name: card.company_name,
      offer_name: card.offer_name,
      invoice_date: '2021-03-01',
      paid: 300,
      remaining: 200,
      comment: 'Comment 3'
    }))
  },
  {
    month: 'April',
    info: mockCards.map((card) => ({
      customer_id: '24127',
      name: 'Customer 4',
      card_number: card.card_number,
      company_name: card.company_name,
      offer_name: card.offer_name,
      invoice_date: '2021-04-01',
      paid: 200,
      remaining: 200,
      comment: 'Comment 4'
    }))
  },
  {
    month: 'May',
    info: mockCards.map((card) => ({
      customer_id: '24128',
      name: 'Customer 5',
      card_number: card.card_number,
      company_name: card.company_name,
      offer_name: card.offer_name,
      invoice_date: '2021-05-01',
      paid: 500,
      remaining: 500,
      comment: 'Comment 5'
    }))
  }
]

export const mockOffers: OfferInfo[] = [
  {
    id: '24124',
    name: 'Offer 1',
    percentage: 10,
    period_in_month: 1,
    comment: 'Comment 1'
  },
  {
    id: '24125',
    name: 'Offer 2',
    percentage: 20,
    period_in_month: 2,
    comment: 'Comment 2'
  },
  {
    id: '24126',
    name: 'Offer 3',
    percentage: 30,
    period_in_month: 3,
    comment: 'Comment 3'
  },
  {
    id: '24127',
    name: 'Offer 4',
    percentage: 40,
    period_in_month: 4,
    comment: 'Comment 4'
  },
  {
    id: '24128',
    name: 'Offer 5',
    percentage: 50,
    period_in_month: 5,
    comment: 'Comment 5'
  },
  {
    id: '24129',
    name: 'Offer 6',
    percentage: 60,
    period_in_month: 6,
    comment: 'Comment 6'
  },
  {
    id: '24130',
    name: 'Offer 7',
    percentage: 70,
    period_in_month: 7,
    comment: 'Comment 7'
  },
  {
    id: '24131',
    name: 'Offer 8',
    percentage: 80,
    period_in_month: 8,
    comment: 'Comment 8'
  },
  {
    id: '24132',
    name: 'Offer 9',
    percentage: 90,
    period_in_month: 9,
    comment: 'Comment 9'
  },
  {
    id: '24133',
    name: 'Offer 10',
    percentage: 100,
    period_in_month: 10,
    comment: 'Comment 10'
  }
]
