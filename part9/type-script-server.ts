import express from "express";
import qs from "qs";
import {calculateBmi} from "./bmiCalculator";


const app = express();

app.set("query parser", (str: string) => qs.parse(str));

app.get("/hello", (_req, res) => {
    res.status(200)
        .send("Hello World!")
        .end()
})

app.get("/bmi", (req, res) => {

    if (!req.query.height) {
        res.status(400)
            .json({error: "malformatted parameters: Please include a height query parameter"});
        return;

    }
    if (!req.query.weight) {
        res.status(400)
            .json({error: "malformatted parameters: Please include a weight query parameter"});
        return;
    }

    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        res.status(400)
            .json({error: "malformatted parameters: The height and weight must be a number"});
        return;
    }

    const bmi = calculateBmi(height, weight)

    res.status(200).json({weight, height, bmi})
    return;
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})