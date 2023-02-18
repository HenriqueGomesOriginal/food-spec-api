import { Request, Response } from "express";
import { getFoodSpecService } from "../service/food-spec.service";

export async function getFoodSpec(
    req: Request,
    res: Response
) {
    console.log(req.params);

    return res.send('Ok');
}

export async function getFoodSpecs (req: Request, res: Response) {
    let param = req.params.foodName.split('-').join(' ');
    
    const ret = await getFoodSpecService(param);

    if (ret == null) {
        return res.status(404).send('Object not found...')
    }
    return res.send(ret);
}
