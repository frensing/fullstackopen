import { useParams } from "react-router-dom";
import { Female, Male } from "@mui/icons-material";
import { Gender, Patient } from "../../types";
import { useEffect, useState } from "react";

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

  return (
    <>
      <h3>
        {patient.name} {patient.gender === Gender.Male ? <Male /> : <Female />}
      </h3>
      <div>SSN: {patient.ssn}</div>
      <div>Occupation: {patient.occupation}</div>
    </>
  );
};

export default PatientPage;
