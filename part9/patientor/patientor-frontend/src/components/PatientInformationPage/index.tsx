import {useParams} from "react-router-dom";
import {usePatient} from "../../hooks/usePatient";
import GeneralInformation from "./GeneralInformation";
import PatientEntries from "./PatientEntries"


const PatientInformationPage = () => {

  const {patientId} = useParams();
  const { patient, status } = usePatient(patientId);

  console.log(patient);

  if(!patient) {
    switch (status) {
      case "loading":
        return <p>Getting patient details...</p>;
      case "not_found":
        return <p>This patient does not exist...</p>;
      case "error":
        return <p>Error getting patient details...</p>;
      default:
        return null;
    }
  }

  return (
    <div>
      <GeneralInformation patient={patient} />
      <PatientEntries patient={patient} />
    </div>);
};

export default PatientInformationPage;