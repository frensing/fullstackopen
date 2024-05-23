import { useEffect, useState } from "react";
import { Diagnosis, Entry as Entry, HealthCheckRating } from "../../types";
import diagnoseService from "../../services/diagnoses";
import { assertNever } from "../../utils";
import {
  Favorite,
  LocalHospital,
  MedicalServices,
  Work,
} from "@mui/icons-material";

interface Props {
  entries: Entry[];
}

const EntryList = ({ entries }: Props) => {
  return (
    <>
      <h4>Entries</h4>
      {entries.map((entry, i) => (
        <EntryComp entry={entry} key={i} />
      ))}
    </>
  );
};

const EntryComp = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "OccupationalHealthcare":
      return (
        <OccupationalEntry entry={entry} employerName={entry.employerName} />
      );
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "HealthCheck":
      return (
        <HealthCheckEntry
          entry={entry}
          healthRating={entry.healthCheckRating}
        />
      );
    default:
      return assertNever(entry);
  }
};

const OccupationalEntry = ({
  entry,
  employerName,
}: {
  entry: Entry;
  employerName: string;
}) => {
  return (
    <div style={{ border: "solid", margin: "3px", padding: "5px" }}>
      {entry.date} <Work /> {employerName}
      <p>{entry.description}</p>
      {entry.diagnosisCodes ? <CodeList codes={entry.diagnosisCodes} /> : null}
      diagnose by {entry.specialist}
    </div>
  );
};

const HospitalEntry = ({ entry }: { entry: Entry }) => {
  return (
    <div style={{ border: "solid", margin: "3px", padding: "5px" }}>
      {entry.date} <LocalHospital />
      <p>{entry.description}</p>
      {entry.diagnosisCodes ? <CodeList codes={entry.diagnosisCodes} /> : null}
      diagnose by {entry.specialist}
    </div>
  );
};

const HealthCheckEntry = ({
  entry,
  healthRating,
}: {
  entry: Entry;
  healthRating: HealthCheckRating;
}) => {
  let ratingColor: string = "black";
  switch (healthRating) {
    case HealthCheckRating.Healthy:
      ratingColor = "green";
      break;
    case HealthCheckRating.LowRisk:
      ratingColor = "yellow";
      break;
    case HealthCheckRating.HighRisk:
      ratingColor = "orange";
      break;
    case HealthCheckRating.CriticalRisk:
      ratingColor = "red";
      break;
    default:
      assertNever(healthRating);
  }
  return (
    <div style={{ border: "solid", margin: "3px", padding: "5px" }}>
      {entry.date} <MedicalServices />
      <p>{entry.description}</p>
      {entry.diagnosisCodes ? <CodeList codes={entry.diagnosisCodes} /> : null}
      <p>
        <Favorite sx={{ color: ratingColor }} />
      </p>
      diagnose by {entry.specialist}
    </div>
  );
};

const CodeList = ({ codes }: { codes: string[] }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const d = await diagnoseService.getAll();
      setDiagnoses(d);
    };
    fetchDiagnoses();
  }, []);

  return (
    <ul>
      {codes.map((code) => (
        <li key={code}>
          {code}: {diagnoses.find((d) => d.code === code)?.name}
        </li>
      ))}
    </ul>
  );
};

export default EntryList;
