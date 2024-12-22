import express from "express";
import qs from "qs";
import {calculateBmi} from "./bmiCalculator";
import {calculateExercises} from "./exerciseCalculator";


const app = express();

app.use(express.json());

app.set("query parser", (str: string) => qs.parse(str));

app.get("/hello", (_req, res) => {
    res.status(200)
        .send("Hello World!");
        return;
});

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

    const bmi = calculateBmi(height, weight);

    res.status(200).json({weight, height, bmi});
    return;
});

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const params = req.body;

    console.log(params);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!params.daily_exercises == null || params.target == null) {
        res.status(400).json({error: "parameters missing"});
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    if (!Array.isArray(params.daily_exercises) || !params.daily_exercises.every((item: unknown) => typeof item === "number")) {
        res.status(400).json({ error: "malformatted parameters" });
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const daily_exercises: number[] = params.daily_exercises;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target = Number(params.target);

    if (isNaN(target)) {
        res.status(400).json({error: "malformatted parameters"});
        return;
    }

    res.status(200)
        .json(calculateExercises(daily_exercises, target));
    return;
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});