import {Box, Button, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {FormEvent, useState} from "react";
import {Diagnosis, PatientFormValues} from "../../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
}

const AddPatientEntryForm = ({onCancel, onSubmit}: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis["code"]>>([]);

  const [formType, setFormType] = useState("");

  const formOptions: string[] = ["Hospital", "Occupational Healthcare", "Health Check"];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputLabel style={{ marginTop: 20 }}>Entry Type:</InputLabel>
        <Select
            label="Entry Type"
            fullWidth
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
        >
          {formOptions.map(option =>
            <MenuItem
              key={option}
              value={option}
            >
              {option}
            </MenuItem>
          )}
        </Select>
        <Box sx={{margin : 3}}>
          {formType && <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={({target}) => setDescription(target.value)}
          />}
          {formType && <TextField
              label="Date"
              placeholder={"YYYY-MM-DD"}
              fullWidth
              value={date}
              onChange={({target}) => setDate(target.value)}
          />}
          {formType && <TextField
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({target}) => setSpecialist(target.value)}
          />}
        </Box>

        <Box sx={{paddingBottom: 3}}>
          {(formType === "Hospital") && <TextField
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({target}) => setSpecialist(target.value)}
          />}
        </Box>


        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{float: "left"}}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
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