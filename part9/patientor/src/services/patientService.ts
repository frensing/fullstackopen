import { v1 as uuid } from "uuid";
import patientData from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";

const getPatients = (): Patient[] => {
  return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient => {
  const patient = patientData.find((e) => e.id === id);

  if (patient) {
    return patient;
  }

  throw Error(`Could not find patient with id: ${id}`);
};

const addPatient = (patient: NewPatient) => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: [],
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatient,
  addPatient,
};
