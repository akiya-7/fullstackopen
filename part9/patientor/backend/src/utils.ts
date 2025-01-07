import { NewPatient, Gender } from "./types";
import { z } from "zod";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string) => {
  return Object.values(Gender)
    .map((o) => o.toString())
    .includes(gender);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw Error("Incorrect or missing name: " + name);
  }
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw Error("Incorrect or missing ssn: " + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): string => {
  if (!isString(gender) || !isGender(gender)) {
    throw Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw Error("Incorrect or missing occupation: " + occupation);
  }
  return occupation;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    return {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
  }

  throw new Error("Incorrect data: some fields are missing");
};

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const zodToNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};

const baseEntrySchema = z.object({
  description: z.string().nonempty(),
  date: z.string().date(),
  specialist: z.string().nonempty(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const healthCheckEntrySchema = baseEntrySchema
  .extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.number().int().min(0).max(3),
  })
  .strip();

const hospitalEntrySchema = baseEntrySchema
  .extend({
    type: z.literal("Hospital"),
    discharge: z.object({
      date: z.string().date(),
      criteria: z.string().nonempty(),
    }),
  })
  .strip();

const occupationalHealthCareSchema = baseEntrySchema
  .extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string().nonempty(),
    sickLeave: z
      .object({
        startDate: z.string().date(),
        endDate: z.string().date(),
      })
      .optional(),
  })
  .strip();

export const toNewEntry = (object: unknown) => {
  const parsed = z.object({ type: z.string() }).parse(object);

  switch (parsed.type) {
    case "HealthCheck":
      return healthCheckEntrySchema.parse(object);
    case "Hospital":
      return hospitalEntrySchema.parse(object);
    case "OccupationalHealthcare":
      return occupationalHealthCareSchema.parse(object);
    default:
      throw Error("Invalid entry type.");
  }
};
