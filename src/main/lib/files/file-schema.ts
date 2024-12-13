export const schema = {
  الاسم: {
    prop: 'name',
    type: String
  },
  'الرقم القومي': {
    prop: 'national_id',
    type: String
  },
  'اسم الجد': {
    prop: 'grand_name',
    type: String
  },
  العنوان: {
    prop: 'address',
    type: String
  },
  الخط: {
    prop: 'card_number',
    type: String
  },
  الشركة: {
    prop: 'company',
    type: String
  },
  'تاريخ سداد الشركة': {
    prop: 'company_invoice_date',
    type: String
  },
  'تاريخ بداية تشغيل الخط': {
    prop: 'card_start_date',
    type: String
  },
  'السعر قبل الضريبة': {
    prop: 'price_before_vat',
    type: String
  },
  'السعر بعد الضريبة': {
    prop: 'price_after_vat',
    type: String
  },
  'اسم العرض': {
    prop: 'offer_name',
    type: String
  },
  'تاريخ انتهاء العرض': {
    prop: 'offer_end_date',
    type: String
  },
  'نسبة الخصم': {
    prop: 'offer_percentage',
    type: Number
  },
  الدفع: {
    prop: 'paid',
    type: Number
  }
}
