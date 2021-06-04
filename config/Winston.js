import winston from 'winston'

const { createLogger, format, transports } = winston
const { combine, timestamp, printf, colorize, errors, json } = format

const myFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`
})

const consoleFormat = combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    myFormat
)

const devFileFormat = combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    myFormat
)

const prodFileFormat = combine(
    timestamp(),
    errors({ stack: true }),
    myFormat
)

const jsonFormat = combine(
    timestamp(),
    errors({ stack: true }),
    json()
)

const logger = createLogger({ transports: [] })

if (process.env.NODE_ENV === 'development') {
    logger.add(new transports.Console({
        format: consoleFormat
    }))
    logger.add(new transports.File({
        filename: './logs/dev.log',
        format: devFileFormat
    }))
    logger.add(new transports.File({
        filename: './logs/dev_json.log',
        format: jsonFormat
    }))
} else {
    logger.add(new transports.File({
        filename: './logs/info_json.log',
        format: jsonFormat
    }))
    logger.add(new transports.File({
        filename: './logs/info.log',
        format: prodFileFormat
    }))
}

export default logger