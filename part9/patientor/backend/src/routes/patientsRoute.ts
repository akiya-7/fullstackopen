import express, { Response } from "express";
import patientsService from "../services/patientsService";
import {NonSensitivePatient} from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientsService.getAllNonSensitivePatients());
    return;
});

export default router;
