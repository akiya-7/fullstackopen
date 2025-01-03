import {Patient} from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import OtherIcon from "@mui/icons-material/Transgender";

interface Props {
  patient: Patient;
}

const GeneralInformationPage = ({patient}: Props) => {

  const GenderIcon = () => {
    switch (patient.gender) {
      case "male":
        return <MaleIcon/>;
      case "female":
        return <FemaleIcon/>;
      case "other":
        return <OtherIcon/>;
      default:
        console.error(`Unhandled entry type: ${patient.gender}`);
        return <p>Unknown entry type</p>;
    }
  };

  return (
    <div key={"general-information"}>
      <h2>
        {patient.name} <GenderIcon />
      </h2>
      <table>
        <tbody>
        <tr key={patient.occupation}>
          <td>Occupation:</td>
          <td>{patient.occupation}</td>
        </tr>
        <tr key={patient.ssn}>
          <td>SSN:</td>
          <td>{patient.ssn}</td>
        </tr>
        <tr key={patient.dateOfBirth}>
          <td>Date of Birth:</td>
          <td>
            {patient.dateOfBirth
              ? new Date(patient.dateOfBirth).toDateString()
              : null}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GeneralInformationPage;
