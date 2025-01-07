import {useState, useEffect, useCallback} from "react";
import patientService from "../services/patients";
import { Patient } from "../types";

export const usePatient = (patientId: string | undefined) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [status, setStatus] = useState<"loading" | "not_found" | "success" | "error">("loading");

  const fetchPatient = useCallback(async () => {
    if (!patientId) return;

    try {
      const fetchedPatient = await patientService.getById(patientId);
      setPatient(fetchedPatient);

      if (fetchedPatient) setStatus("success");
      else setStatus("not_found");
    } catch {
      setStatus("error");
    }
  }, [patientId]);

    useEffect(() => {
      fetchPatient();
    }, [fetchPatient]);

  return { patient, patientStatus: status, refetch: fetchPatient };
};
