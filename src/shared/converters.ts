export function convertStringToDate(text?: string): Date {
  if (!text) return new Date()
  const [year, month, day] = text.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function convertDateToString(date?: Date): string {
  const data = date ?? new Date()
  return `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`
}

export const getMonthFromDate = (date: string) => {
  const [_, month] = date.split('-').map(Number)
  return month
}
