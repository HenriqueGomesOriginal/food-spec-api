import { databaseResponseTimeHistogram } from "../utils/metrics";
import fetch from "node-fetch";
const dotenv = require('dotenv');

// import interface request object
import { foodRequest } from "../data/food-request.data";

export async function getFoodSpecService (queryParam: string) {
    dotenv.config();
    const metricsLabels = {
        operation: "getFoodSpec",
    };
    const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const rawRes = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.API_KEY}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: queryParam,
                pageSize: 1,
                pageNumber: 1
            })
        });
        timer({ ...metricsLabels, success: "true" });
        
        let responseJson = await rawRes.json();
        let response = {} as foodRequest;
        
        response = responseJson as foodRequest; 

        return response.foods[0];
    } catch (error) {
        timer({...metricsLabels, success: "false"});
        throw error;
        return null;
    }
}
