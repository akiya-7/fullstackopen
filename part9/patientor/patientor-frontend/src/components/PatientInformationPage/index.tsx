import {useParams} from "react-router-dom";
import {usePatient} from "../../hooks/usePatient";
import GeneralInformation from "./GeneralInformation";
import PatientEntries from "./PatientEntries";
import {useState} from "react";
import {NewEntry} from "../../types";
import axios from "axios";
import patientService from "../../services/patients";
import {Button} from "@mui/material";
import AddPatientEntryModal from "./AddPatientEntryModal";
import _ from "lodash";



const PatientInformationPage = () => {

  const {patientId} = useParams();
  const { patient, patientStatus, refetch } = usePatient(patientId);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [error, setError] = useState<string>();

  console.log(patient);
  console.log(error);

  if(!patient) {
    switch (patientStatus) {
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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      await patientService.createEntry(patient.id, values);

      setModalOpen(false);
      await refetch();

    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data.error) {
          alert(`Invalid request: field "${_.startCase(e.response.data.error[0].path.join(" "))}" - ${e.response.data.error[0].message}`);
        }
      }
      else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <GeneralInformation patient={patient} />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      <AddPatientEntryModal modalOpen={modalOpen} onClose={closeModal} onSubmit={submitNewEntry} />
      <PatientEntries patient={patient}/>
    </div>);
};

export default PatientInformationPage;