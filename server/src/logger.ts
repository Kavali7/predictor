import pino, { LoggerOptions } from "pino";

const shouldPrettyPrint = process.env.NODE_ENV === "development";

const level = process.env.NODE_ENV === "test" ? "silent" : process.env.LOG_LEVEL ?? "info";

export const loggerConfig: LoggerOptions = {
  level,
  transport: shouldPrettyPrint
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
        },
      }
    : undefined,
};

const logger = pino(loggerConfig);

export default logger;
