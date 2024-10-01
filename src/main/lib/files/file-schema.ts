export const schema = {
  الاسم: {
    prop: 'name',
    data: String
  },
  'الرقم القومي': {
    prop: 'national_id',
    data: String
  },
  'اسم الجد': {
    prop: 'grand_name',
    data: String
  },
  العنوان: {
    prop: 'address',
    data: String
  },
  الخط: {
    prop: 'card_number',
    data: String
  },
  الشركة: {
    prop: 'company',
    data: String
  },
  'تاريخ سداد الشركة': {
    prop: 'company_invoice_date',
    data: String
  },
  'تاريخ بداية تشغيل الخط': {
    prop: 'card_start_date',
    data: String
  },
  'السعر قبل الضريبة': {
    prop: 'price_before_vat',
    data: String
  },
  'السعر بعد الضريبة': {
    prop: 'price_after_vat',
    data: String
  },
  'اسم العرض': {
    prop: 'offer_name',
    data: String
  },
  'تاريخ انتهاء العرض': {
    prop: 'offer_end_date',
    data: String
  },
  'نسبة الخصم': {
    prop: 'offer_percentage',
    date: Number
  },
  الدفع: {
    prop: 'paid',
    data: Number
  }
}
