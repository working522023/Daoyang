import winston from 'winston';
import path from 'path';
import 'winston-daily-rotate-file';

// Define custom log levels (optional)
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
  },
};

// Apply colors to the log levels
winston.addColors(customLevels.colors);

// Create the logger instance
export const logger = winston.createLogger({
  levels: customLevels.levels,
  level: process.env.LOG_LEVEL || 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.colorize(),
    winston.format.printf(
      ({ timestamp, level, message, stack }) =>
        `${timestamp} ${level}: ${stack || message}`,
    ),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),

    // Daily rotate file transport for error logs
    new winston.transports.DailyRotateFile({
      filename: path.join(__dirname, '../logs/error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '14d',
      zippedArchive: true,
    }),

    // Daily rotate file transport for all logs
    new winston.transports.DailyRotateFile({
      filename: path.join(__dirname, '../logs/application-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      zippedArchive: true,
    }),
  ],
});

// Handle exceptions and rejections
logger.exceptions.handle(
  new winston.transports.File({ filename: path.join(__dirname, '../logs/exceptions.log') })
);

logger.rejections.handle(
  new winston.transports.File({ filename: path.join(__dirname, '../logs/rejections.log') })
);
