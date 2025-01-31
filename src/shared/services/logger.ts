import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'

const isDev = process.env.NODE_ENV === 'development'

const logger = createLogger({
  level: isDev ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.printf(({ level, message, timestamp, stack }) =>
      stack
        ? `[${timestamp}] ${level.toUpperCase()}: ${stack}`
        : `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        // format.colorize(),
        format.printf(({ level, message, timestamp, stack }) =>
          stack
            ? `[${timestamp}] ${level.toUpperCase()}: ${stack}`
            : `[${timestamp}] ${level.toUpperCase()}: ${message}`
        )
      )
    }),
    ...(isDev
      ? []
      : [
          new transports.DailyRotateFile({
            filename: 'logs/simmer-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '10m',
            maxFiles: '14d',
            zippedArchive: true
          })
        ])
  ]
})

export class LoggerService {
  static info(message: string, meta?: any): void {
    logger.info(message, meta)
  }

  static error(error: Error | string, meta?: any): void {
    if (error instanceof Error) {
      logger.error(error.message, { stack: error.stack, ...meta })
    } else {
      logger.error(error, meta)
    }
  }

  static warn(message: string, meta?: any): void {
    logger.warn(message, meta)
  }

  static debug(message: string, meta?: any): void {
    logger.debug(message, meta)
  }
}
