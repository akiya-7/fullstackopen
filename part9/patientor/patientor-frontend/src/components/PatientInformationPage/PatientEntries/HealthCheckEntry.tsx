import {Diagnosis, IHealthCheckEntry} from "../../../types";
import BaseEntry from "./BaseEntry";
import Rating, { } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';

interface Props {
  entry: IHealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = ({entry, diagnoses}: Props) => {


  const customIcons: Record<number, { icon: React.ReactNode; label: string }> = {
    1: {
      icon: <SentimentVerySatisfiedIcon color="success" />,
      label: "Healthy",
    },
    2: {
      icon: <SentimentSatisfiedAltIcon color="info" />,
      label: "Low Risk",
    },
    3: {
      icon: <SentimentDissatisfiedIcon color="warning" />,
      label: "High Risk",
    },
    4: {
      icon: <SentimentVeryDissatisfiedIcon color="error" />,
      label: "Critical Risk",
    },
  };
  const currentRating = entry.healthCheckRating;

  return (
    <BaseEntry entry={entry} diagnoses={diagnoses}>
      <p>Health Check Rating: <>{customIcons[currentRating + 1]?.label}</></p>
      <Rating
        name={"highlight-selected-only"}
        value={4 - entry.healthCheckRating}
        readOnly
        max={4}
        icon={<>{customIcons[currentRating + 1].icon}</>}
        emptyIcon={<SentimentNeutralIcon/>}
        highlightSelectedOnly
      />
    </BaseEntry>
  );
};

export default HealthCheckEntry;