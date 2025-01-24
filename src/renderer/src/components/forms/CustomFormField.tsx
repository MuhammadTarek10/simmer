/* eslint-disable no-unused-vars */
import { E164Number } from 'libphonenumber-js/core'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Control } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/utils/utils'
import { DropDownOption } from '@shared/types'
import CustomSelect from '../CustomSelect'

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton'
}

interface CustomProps {
  control: Control<any>
  name: string
  label?: string
  placeholder?: string
  iconSrc?: string
  iconAlt?: string
  disabled?: boolean
  dateFormat?: string
  showTimeSelect?: boolean
  children?: React.ReactNode
  renderSkeleton?: (field: any) => React.ReactNode
  fieldType: FormFieldType
  options?: DropDownOption[]
  height?: string
  className?: string
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props!.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className={cn(props!.className, 'flex rounded-md border border-black')}>
          <FormControl>
            <Input placeholder={props!.placeholder} {...field} className="border-none" />
          </FormControl>
        </div>
      )
    case FormFieldType.TEXTAREA:
      return (
        <FormControl className={cn(props!.className, 'border border-black')}>
          <Textarea
            placeholder={props!.placeholder}
            {...field}
            className={cn(
              props!.height,
              'placeholder:text-dark-600 border-black focus-visible:ring-0 focus-visible:ring-offset-0'
            )}
            disabled={props!.disabled}
          />
        </FormControl>
      )
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl className={cn(props!.className)}>
          <PhoneInput
            defaultCountry="EG"
            placeholder={props!.placeholder}
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
          />
        </FormControl>
      )
    case FormFieldType.DATE_PICKER:
      return (
        <FormControl className={cn(props!.className, 'p-2 border border-black rounded-lg w-full')}>
          <ReactDatePicker
            showTimeSelect={props!.showTimeSelect ?? false}
            selected={field.value}
            onChange={(date: Date | null) => field.onChange(date)}
            timeInputLabel="Time:"
            dateFormat={props!.dateFormat ?? 'dd/MM/yyyy'}
            wrapperClassName="overflow-hidden border-transparent w-full placeholder:text-dark-600 h-11 rounded-md outline-none"
          />
        </FormControl>
      )
    case FormFieldType.SELECT:
      return (
        <FormControl className={cn(props!.className)}>
          <CustomSelect
            onChange={field.onChange}
            placeholder={field.value}
            options={props!.options}
          />
        </FormControl>
      )
    case FormFieldType.SKELETON:
      return props!.renderSkeleton ? props!.renderSkeleton(field) : null
    default:
      return null
  }
}

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          {label && <FormLabel className="text-2xl">{label}</FormLabel>}
          <RenderInput field={field} props={props} />

          <FormMessage className="text-failure" />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
