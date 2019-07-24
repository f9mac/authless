const path = require('path');
const winston = require('winston');

const logger = (caller) => {
  return winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
      winston.format.label({ label: path.basename(caller) }),
      winston.format.colorize(),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf(info => {
        const base = `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`;
        if (info instanceof Error) {
          return `${base} \n ${info.stack}`;
        }
        return base;
      }),
    ),
    transports: [new winston.transports.Console()],
    colorize: true,
  });
}

module.exports = logger;
