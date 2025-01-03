import {Entry, Patient} from "../../types";

interface Props {
  patient: Patient;
}

const PatientEntries = ({patient}: Props) => {

  const entries = patient.entries;
  console.log(entries);
  return (<div key={"patient-entries"}>
    {entries.map( (entry: Entry) => {
      return (
        <div key={entry.id}>
          <p>{entry.date} <i>{entry.description}</i></p>
          {entry.diagnosisCodes &&
              <ul>
                {entry.diagnosisCodes.map( (code) => {
                return (<li key={code}>{code}</li>);
                })}
              </ul>}
        </div>
      );
    })}
  </div>);
};

export default PatientEntries;