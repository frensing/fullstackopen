import { NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseString = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error("Incorrect or missing input");
  }
  return text;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    console.log(date, isString(date), isDate(date as string));
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const toNewPatient = (object: unknown) => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseString(object.gender),
      occupation: parseString(object.occupation),
    };
    return newPatient;
  }

  throw new Error("Incorrect data: a field is missing");
};

export default toNewPatient;
