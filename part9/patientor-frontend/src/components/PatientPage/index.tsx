import { useParams } from "react-router-dom";
import { Female, Male, Transgender } from "@mui/icons-material";
import { Entry, Gender, Patient } from "../../types";
import { useEffect, useState } from "react";
import EntryList from "./entryList";
import EntryForm from "./EntryForm";

interface Props {
  patientService: (id: string) => Promise<Patient>;
}

const PatientPage = ({ patientService }: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id;
  if (!id) return <p>Could not find id.</p>;

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const p = await patientService(id);
      setPatient(p);
    };
    fetchPatient(id);
  }, []);

  if (!patient) return <p>Could not find patient.</p>;

  const setEntries = (entries: Entry[]) => {
    const updatetPatient = {
      ...patient,
      entries,
    };
    setPatient(updatetPatient);
  };

  return (
    <>
      <h3>
        {patient.name}{" "}
        {patient.gender === Gender.Male ? (
          <Male />
        ) : patient.gender === Gender.Female ? (
          <Female />
        ) : (
          <Transgender />
        )}
      </h3>
      <div>SSN: {patient.ssn}</div>
      <div>Occupation: {patient.occupation}</div>

      <EntryForm
        patienId={patient.id}
        entries={patient.entries}
        setEntries={setEntries}
        type="HealthCheck"
      />

      <EntryForm
        patienId={patient.id}
        entries={patient.entries}
        setEntries={setEntries}
        type="Hospital"
      />

      <EntryForm
        patienId={patient.id}
        entries={patient.entries}
        setEntries={setEntries}
        type="OccupationalHealthcare"
      />

      <EntryList entries={patient.entries} />
    </>
  );
};

export default PatientPage;
