import {Diagnosis, Entry, Patient} from "../../../types";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import {useEffect, useState} from "react";
import diagnosesService from "../../../services/diagnoses";

interface Props {
  patient: Patient;
}

const PatientEntries = ({patient}: Props) => {

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  useEffect(() => {
    diagnosesService.getAllDiagnoses().then(r => setDiagnoses(r));
  }, []);

  console.log(patient.entries);

  return (
    <div key={"patient-entries"}>
      {patient.entries.map( (entry: Entry) => {
        switch (entry.type) {
          case "Hospital":
            return <HospitalEntry key={entry.id} entry={entry} diagnoses={diagnoses}></HospitalEntry>;
          case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry key={entry.id} entry={entry} diagnoses={diagnoses}></OccupationalHealthcareEntry>;
          case "HealthCheck":
            return <HealthCheckEntry key={entry.id} entry={entry} diagnoses={diagnoses}></HealthCheckEntry>;
          default:
            console.error(`Unhandled entry type: ${entry}`);
            return <p>Unknown entry type</p>;
        }
      })}
    </div>);
};

export default PatientEntries;