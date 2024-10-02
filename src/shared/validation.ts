import { z } from 'zod'

export const CompanyValidationSchema = z.object({
  name: z
    .string({
      message: 'مطلوب'
    })
    .max(255),
  invoice_date: z.date().optional(),
  comment: z.string().optional()
})

export const OfferValidationSchema = z.object({
  name: z
    .string({
      message: 'مطلوب'
    })
    .min(2, {
      message: 'يجب أن يكون اسم العرض أكبر من 2 أحرف'
    })
    .max(255),
  percentage: z.coerce
    .number({
      message: 'مطلوب'
    })
    .min(0)
    .max(100),
  end_date: z.date({
    message: 'مطلوب'
  }),
  comment: z.string().optional()
})

export const CustomerValidationSchema = z.object({
  name: z
    .string({
      message: 'مطلوب'
    })
    .min(3, {
      message: 'يجب أن يكون اسم العميل أكبر من 3 أحرف'
    })
    .max(255),
  national_id: z
    .string()
    .length(14, {
      message: 'يجب أن يكون الرقم القومي 14 رقم'
    })
    .optional(),
  grand_name: z.string().optional(),
  address: z.string().optional(),
  comment: z.string().optional()
})

export const CardValidationSchema = z.object({
  card_number: z
    .string({
      message: 'مطلوب'
    })
    .length(11, {
      message: 'يجب أن يكون رقم الخط 11 رقم'
    }),
  company_name: z.string({
    message: 'مطلوب'
  }),
  start_date: z.date({
    message: 'مطلوب'
  }),
  price_before_vat: z.coerce.number({
    message: 'مطلوب'
  }),
  price_after_vat: z.coerce.number({
    message: 'مطلوب'
  }),
  offer_name: z.string().optional(),
  comment: z.string().optional()
})

export const InvoiceValidationSchema = z.object({
  customer_name: z.string({
    message: 'مطلوب'
  }),
  invoice_date: z.date({
    message: 'مطلوب'
  }),
  amount: z.coerce.number({
    message: 'مطلوب'
  }),

  comment: z.string().optional()
})
