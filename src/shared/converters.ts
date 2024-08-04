export function convertStringToDate(text?: string): Date {
  if (!text) return new Date()
  const [year, month, day] = text.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function convertDateToString(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
