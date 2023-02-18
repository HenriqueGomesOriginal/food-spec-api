import logger from "pino";
import pretty from "pino-pretty";
//import * as dayjs from "dayjs";
/*
const log = logger({
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});
*/

const stream = pretty({
    colorize: true
});
const log = logger(stream);

export default log;
