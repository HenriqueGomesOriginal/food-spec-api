import { Request, Response } from "express";
import responseTime from "response-time";
//import config from "../config/dev.config";
//import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
//import deserializeUser from "./middleware/deserializeUser";
import { restResponseTimeHistogram, startMetricsServer } from "./utils/metrics";
import swaggerDocs from "./utils/swagger";

const PORT = 3001;

const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);


app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`);

  //await connect();

  routes(app);

  startMetricsServer();

  swaggerDocs(app, PORT);
});
