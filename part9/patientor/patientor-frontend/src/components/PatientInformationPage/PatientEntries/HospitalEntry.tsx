import {Diagnosis, IHospitalEntry} from "../../../types";
import BaseEntry from "./BaseEntry";

interface Props {
  entry: IHospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({entry, diagnoses}: Props) => {

  return (
    <BaseEntry entry={entry} diagnoses={diagnoses}>
      <table>
        <tbody>
        <tr>
          <td>Date of Discharge:</td>
          <td>{new Date(entry.discharge.date).toDateString()}</td>
        </tr>
        <tr>
          <td>Criteria for Discharge: </td>
          <td>{entry.discharge.criteria}</td>
        </tr>
        </tbody>
      </table>
    </BaseEntry>
  );
};

export default HospitalEntry;