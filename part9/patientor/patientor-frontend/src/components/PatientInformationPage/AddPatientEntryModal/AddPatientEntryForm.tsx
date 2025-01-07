import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";
import {Entry, IHospitalEntry, NewEntry} from "../../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
}

interface FormOption {
  label: string,
  value: string,
}

const AddPatientEntryForm = ({ onCancel, onSubmit }: Props) => {
  const formOptions: FormOption[] = [
    {
      label: "Hospital",
      value: "Hospital"
    },
    {
      label: "Health Check",
      value: "HealthCheck",
    },
    {
      label: "Occupational Healthcare",
      value: "OccupationalHealthcare",
    },
  ];
  const [formType, setFormType] = useState<Entry["type"] | "">("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const baseEntry = {
      type: formType,
      date,
      specialist,
      description,
      diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(",") : undefined,
    };

    let entry: NewEntry;

    if (!formType) {
      alert("Form type must be selected.");
      return;
    }

    switch (formType) {
      case "Hospital":
        entry = {
          ...baseEntry,
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        } as Omit<IHospitalEntry, "id">;
        break;
      // case "HealthCheck":
      //   entry = {
      //     ...baseEntry,
      //     healthCheckRating: healthCheckRating!,
      //   };
      //   break;
      // case "OccupationalHealthcare":
      //   entry = {
      //     ...baseEntry,
      //     employerName,
      //     sickLeave: sickLeaveStartDate && sickLeaveEndDate
      //       ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate }
      //       : undefined,
      //   };
      //   break;
      default:
        throw new Error("Invalid form type");
    }

    onSubmit(entry);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: 3 }}>
          <InputLabel>Entry Type:</InputLabel>
          <Select
            label="Entry Type"
            fullWidth
            value={formType}
            onChange={(e) => setFormType(e.target.value as Entry["type"])}
          >
            {formOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {formType && (
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <TextField
              label="Date"
              placeholder={"YYYY-MM-DD"}
              fullWidth
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
            <TextField
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <TextField
              label="Diagnosis Codes"
              placeholder={"S62.5, S03.5, ..."}
              fullWidth
              value={diagnosisCodes}
              onChange={({ target }) => setDiagnosisCodes(target.value)}
            />
          </Box>
        )}

        {formType === "Hospital" && (
          <Box sx={{ paddingBottom: 3 }}>
            <TextField
              label="Discharge Date"
              placeholder={"YYYY-MM-DD"}
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </Box>
        )}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{ float: "right" }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPatientEntryForm;
