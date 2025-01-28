import { createLogger, format, transports } from 'winston'
import * as dotenv from 'dotenv'

dotenv.config()

const logger = createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      ({ level, message, timestamp }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: 'logs/simmer.log' }) // Log to a file
  ]
})

export class LoggerService {
  static info(message: string): void {
    logger.info(message)
  }

  static error(message: string): void {
    logger.error(message)
  }

  static warn(message: string): void {
    logger.warn(message)
  }

  static debug(message: string): void {
    logger.debug(message)
  }
}
