import express, {Response} from "express";
import diagnosesService from "../src/services/diagnosesService";
import {Diagnosis} from "../src/types";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
    res.send(diagnosesService.getAllDiagnoses());
    return;
});

export default router;