import {useParams} from "react-router-dom";
import {usePatient} from "../../hooks/usePatient";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import OtherIcon from '@mui/icons-material/Transgender';

const PatientInformationPage = () => {

  const {patientId} = useParams();
  const { patient, status } = usePatient(patientId);

  console.log(patient);

  if (status === "loading") return <p>Getting patient details...</p>;
  if (status === "not_found") return <p>This patient does not exist...</p>;
  if (status === "error") return <p>Error getting patient details...</p>;

  const genderIcon = (() => {
    switch (patient?.gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      case "other":
        return <OtherIcon />;
    }
  })();

  return (
    <div>
      <h2>{patient?.name} {genderIcon}</h2>
      <table>
        <tbody>
        <tr key={patient?.occupation}>
          <td>Occupation:</td>
          <td>{patient?.occupation}</td>
        </tr>
        <tr key={patient?.ssn}>
          <td>SSN:</td>
          <td>{patient?.ssn}</td>
        </tr>
        <tr key={patient?.dateOfBirth}>
          <td>Date of Birth:</td>
          <td>{patient?.dateOfBirth ? new Date(patient?.dateOfBirth).toDateString() : null}</td>
          </tr>
        </tbody>
      </table>
    </div>);
};

export default PatientInformationPage;