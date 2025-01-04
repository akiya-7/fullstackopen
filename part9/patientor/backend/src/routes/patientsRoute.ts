import express, { Response } from "express";
import patientsService from "../services/patientsService";
import { NewEntry, NewPatient, NonSensitivePatient } from "../types";
import { toNewEntry, zodToNewPatient } from "../utils";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getAllNonSensitivePatients());
  return;
});

router.post("/", (req, res) => {
  try {
    const validate: NewPatient = zodToNewPatient(req.body);
    const newPatient = patientsService.newPatient(validate);

    res.json(newPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else {
      res.status(400).json({ error: "An unknown error occurred." });
    }
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  try {
    const patient = patientsService.getPatientById(id);

    if (!patient) {
      res.status(404).json({ error: "No patient found with this ID." });
    } else {
      res.json(patient);
    }
  } catch {
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});

router.post("/:id/entries", (req, res) => {
  const id = req.params.id;

  try {
    const validate: NewEntry = toNewEntry(req.body);
    const newEntry = patientsService.newEntry(id, validate);
    const patient = patientsService.getPatientById(id);

    res.json({
      message: `Entry successfully added to patient id: ${id}`,
      patient: patient,
      entry: newEntry,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unexpected error occurred." });
    }
  }
});

export default router;
