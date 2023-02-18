import { object, string } from "zod";

export const getFoodSpec = object({
    body: object({
        foodName: string({
            required_error = "Food name is required!"
        })
    })
})
