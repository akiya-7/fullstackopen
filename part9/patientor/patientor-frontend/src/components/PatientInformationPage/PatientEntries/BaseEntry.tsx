import {ReactNode} from "react";
import {Diagnosis, Entry} from "../../../types";

import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import WorkIcon from '@mui/icons-material/Work';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import {Box} from "@mui/material";


interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
  children: ReactNode;
}

const BaseEntry = ({entry, diagnoses, children}: Props) => {

  const EntryIcon = () => {
    switch (entry.type) {
      case "Hospital":
        return <MedicalInformationIcon />;
      case "OccupationalHealthcare":
        return <WorkIcon />;
      case "HealthCheck":
        return <MonitorHeartIcon />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p:1, m: 1, border: '1px solid', borderRadius: 2 }}>
      <p>{entry.date} <EntryIcon /></p>
      <p><i>{entry.description}</i></p>

      {entry.diagnosisCodes &&
          <ul>
            {entry.diagnosisCodes.map( (code) => {

              if (diagnoses.length === 0) {
                return <li key={code}>{code}</li>;
              }

              const diagnosis = diagnoses.find( (diagnosis) => diagnosis.code === code);

              if (!diagnosis) {
                console.error(`Diagnosis code ${code} is not in our system, please contact administrator.`);
                return;
              }

              return (<li key={diagnosis.code}>{diagnosis.code}: {diagnosis.name}</li>);
            })}
          </ul>
      }

      {children}

      <p>Diagnosis by {entry.specialist}</p>
    </Box>
  );
};

export default BaseEntry;