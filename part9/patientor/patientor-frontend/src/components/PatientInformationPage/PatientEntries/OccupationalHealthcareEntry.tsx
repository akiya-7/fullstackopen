import {Diagnosis, IOccupationalHealthcareEntry} from "../../../types";
import BaseEntry from "./BaseEntry";

interface Props {
  entry: IOccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry = ({entry, diagnoses}: Props) => {

  const dateFormat: Intl.DateTimeFormatOptions = {day: "numeric", month: "short", year: "numeric"};

  return (
    <BaseEntry entry={entry} diagnoses={diagnoses}>
      <table>
        <tbody>
        <tr>
          <td>Employer:</td>
          <td>{entry.employerName}</td>
        </tr>
        {entry.sickLeave &&
            <tr>
              <td>Duration of leave:</td>
              <td>{new Date(entry.sickLeave.startDate).toLocaleDateString("au-EN", dateFormat)} - {new Date(entry.sickLeave.endDate).toLocaleDateString("au-EN", dateFormat)}</td>
            </tr>
        }
        </tbody>
      </table>
    </BaseEntry>
  );
};

export default OccupationalHealthcareEntry;