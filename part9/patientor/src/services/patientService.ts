import { v1 as uuid } from "uuid";
import patientData from "../../data/patients-full";
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  EntryWithoutId,
  Entry,
} from "../types";

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

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const patient = patientData.find((e) => e.id === patientId);
  if (patient) {
    const newEntry = {
      id: uuid(),
      ...entry,
    };

    patient.entries.push(newEntry);
    return newEntry;
  }
  throw Error(`Could not find patient with id: ${patientId}`);
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatient,
  addPatient,
  addEntry,
};
