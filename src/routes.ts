import { Express, Request, Response } from "express";
//import validateResource from './middleware/validateResource';
import { getFoodSpecs, getFoodSpec } from './controller/food-spec.controller'; 

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * /api/v1/getFoodSpecs/{foodName}:
   * get:
   *    tags:
   *    - FoodSpec
   *    desciption: Get food nutritious values
   *    responses:
   *      200:
   *        description: Food result
   *      404:
   *        description: Not found food
   */
   app.get("/api/v1/getFoodSpecs/:foodName", getFoodSpecs);
} 

export default routes;
