import { useEffect, useState } from "react";
import patientService from "../../../services/patients";
import diagnoseService from "../../../services/diagnoses";
import axios from "axios";
import { Entry } from "../../../types";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import {
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface BaseEntry {
  type: string;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes: string[];
}

const EntryForm = ({
  patienId,
  entries,
  setEntries,
  type,
}: {
  patienId: string;
  entries: Entry[];
  setEntries: (entries: Entry[]) => void;
  type: "HealthCheck" | "Hospital" | "OccupationalHealthcare";
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthRating, setHealthRating] = useState("");

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const [diagnoseCodeList, setDiagnoseCodeList] = useState<string[]>([]);

  useEffect(() => {
    diagnoseService
      .getAll()
      .then((data) => setDiagnoseCodeList(data.map((d) => d.code)));
  }, []);

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const baseEntry: BaseEntry = {
      type,
      date,
      description,
      specialist,
      diagnosisCodes: diagnosisCodes,
    };

    const newEntry = populateEntry(baseEntry);

    patientService
      .createEntry(patienId, newEntry)
      .then((data) => {
        setEntries(entries.concat(data));

        setDescription("");
        setDate("");
        setSpecialist("");
        setDiagnosisCodes([]);

        setHealthRating("");

        setDischargeDate("");
        setDischargeCriteria("");

        setEmployerName("");
        setSickLeaveStart("");
        setSickLeaveEnd("");
      })
      .catch((e) => {
        if (axios.isAxiosError(e) && e.response) {
          setErrorMessage(e.response.data);
          setTimeout(() => setErrorMessage(""), 5000);
        } else {
          setErrorMessage("Unknown Error");
          setTimeout(() => setErrorMessage(""), 5000);
        }
      });
  };

  const populateEntry = (entry: BaseEntry) => {
    switch (type) {
      case "HealthCheck":
        return {
          ...entry,
          healthCheckRating: Number(healthRating),
        };
      case "Hospital":
        return {
          ...entry,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
      case "OccupationalHealthcare":
        return {
          ...entry,
          employerName,
          sickLeave: {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd,
          },
        };
    }
  };

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div style={{ border: "dashed", padding: "5px" }}>
      <b>New {type} entry</b>
      <p style={{ color: "#F00" }}>{errorMessage}</p>
      <form onSubmit={entryCreation}>
        Description
        <div>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        Date
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        Specialist
        <div>
          <input
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </div>
        Diagnosis Codes
        <div>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {diagnoseCodeList.map((code) => (
              <MenuItem key={code} value={code}>
                <Checkbox checked={diagnosisCodes.indexOf(code) > -1} />
                <ListItemText primary={code} />
              </MenuItem>
            ))}
          </Select>
        </div>
        {type === "HealthCheck" && (
          <HealthCheckForm
            healthRating={healthRating}
            setHealthRating={setHealthRating}
          />
        )}
        {type === "Hospital" && (
          <HospitalForm
            date={dischargeDate}
            criteria={dischargeCriteria}
            setDate={setDischargeDate}
            setCriteria={setDischargeCriteria}
          />
        )}
        {type === "OccupationalHealthcare" && (
          <OccupationalHealthcareForm
            employerName={employerName}
            setEmployerName={setEmployerName}
            startDate={sickLeaveStart}
            setStartDate={setSickLeaveStart}
            endDate={sickLeaveEnd}
            setEndDate={setSickLeaveEnd}
          />
        )}
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default EntryForm;
