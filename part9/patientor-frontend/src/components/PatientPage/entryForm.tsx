import { useState } from "react";
import patientService from "../../services/patients";
import axios from "axios";
import { Entry } from "../../types";

const EntryForm = ({
  patienId,
  entries,
  setEntries,
}: {
  patienId: string;
  entries: Entry[];
  setEntries: (entries: Entry[]) => void;
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthRating, setHealthRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    patientService
      .createEntry(patienId, {
        type: "HealthCheck",
        date,
        description,
        specialist,
        healthCheckRating: Number(healthRating),
        diagnosisCodes: diagnosisCodes.split(",").map((x) => x.trim()),
      })
      .then((data) => {
        setEntries(entries.concat(data));

        setDescription("");
        setDate("");
        setSpecialist("");
        setHealthRating("");
        setDiagnosisCodes("");
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

  return (
    <div style={{ border: "dashed", padding: "5px" }}>
      <b>New HealthCheck entry</b>
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
        Healthcheck rating
        <div>
          <input
            value={healthRating}
            onChange={(e) => setHealthRating(e.target.value)}
          />
        </div>
        Diagnosis Codes
        <div>
          <input
            value={diagnosisCodes}
            onChange={(e) => setDiagnosisCodes(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default EntryForm;
