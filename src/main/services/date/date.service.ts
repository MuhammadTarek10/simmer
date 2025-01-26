export class DateService {
  public static async getCurrentDate(): Promise<Date> {
    return new Date()
  }
}
