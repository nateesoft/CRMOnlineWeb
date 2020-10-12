const winston = require('winston');
const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;

require('winston-daily-rotate-file');

const tsFormat = () => new Date().toJSON();
const addFields = format((info, opts) => {
  const { appName, env, hostname } = opts.config;
  return {
    ...info,
    app: appName,
    env,
    hostname,
    '@message': info.message,
  };
});

const logToFile = printf(info => {
  let { level, message } = info;
  switch (level) {
    case 'error':
      level = 'ERROR';
      break;
    case 'warn':
      level = 'WARN';
      break;
    default:
      break;
  }
  if (typeof message === 'object') {
    message = JSON.stringify(message);
  }
  return `${new Date().toJSON()} [${level}] ${message}`;
});

const logger = (config = {}) => {
  const { appName, logLevel, defaultMeta } = config;
  const logPath = `./logs/${appName}`;

  const tee = [
    new transports.Console({
      colorize: true,
      format: logToFile,
    }),
    new transports.DailyRotateFile({
      filename: `${logPath}_ERROR_%DATE%.log`,
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
      timestamp: tsFormat,
      colorize: true,

      format: logToFile,
    }),
    new transports.DailyRotateFile({
      filename: `${logPath}_ALL_%DATE%.log`,
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      timestamp: tsFormat,
      colorize: true,

      format: logToFile,
    }),
  ];

  return createLogger({
    format: combine(
      label({
        label: appName,
      }),
      addFields({ config }),
      timestamp(),
    ),
    level: logLevel,
    defaultMeta: { ...defaultMeta, service: appName },
    transports: tee,
  });
};

module.exports = logger;
