import { foodNutrients } from "./food-nutrients.model"; 

export interface food {
    fdcId: number,
    description: string,
    dataType: string,
    brandOwner: string,
    igredients: string,
    foodCategory: string,
    servingSizeUnit: string,
    foodNutrients: Array<foodNutrients>
}
