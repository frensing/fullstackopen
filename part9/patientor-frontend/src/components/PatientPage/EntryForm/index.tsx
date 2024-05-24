import { useState } from "react";
import patientService from "../../../services/patients";
import axios from "axios";
import { Entry } from "../../../types";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";

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
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const [healthRating, setHealthRating] = useState("");

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const baseEntry: BaseEntry = {
      type,
      date,
      description,
      specialist,
      diagnosisCodes: diagnosisCodes.split(",").map((x) => x.trim()),
    };

    const newEntry = populateEntry(baseEntry);

    patientService
      .createEntry(patienId, newEntry)
      .then((data) => {
        setEntries(entries.concat(data));

        setDescription("");
        setDate("");
        setSpecialist("");
        setDiagnosisCodes("");

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
          <input
            value={diagnosisCodes}
            onChange={(e) => setDiagnosisCodes(e.target.value)}
          />
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
