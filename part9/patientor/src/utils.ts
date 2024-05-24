import {
  BaseEntryWithoutId,
  Diagnosis,
  Discharge,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  NewPatient,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
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

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect gender: ${gender}`);
  }
  return gender;
};

export const toNewPatient = (object: unknown) => {
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
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: [],
    };
    return newPatient;
  }

  throw new Error("Incorrect data: a field is missing");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const isHealthRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthRating = (rating: unknown) => {
  if (typeof rating !== "number" || !isHealthRating(rating)) {
    throw new Error(`Incorrect rating: ${rating}`);
  }
  return rating;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "date" in object &&
    "description" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    let newEntry: BaseEntryWithoutId = {
      ...object,
      date: parseDate(object.date),
      description: parseString(object.description),
      specialist: parseString(object.specialist),
      diagnosisCodes:
        "diagnosisCodes" in object
          ? parseDiagnosisCodes(object.diagnosisCodes)
          : undefined,
    };

    switch (object.type) {
      case "Hospital":
        return toNewHospital(newEntry);
      case "HealthCheck":
        return toNewHealthCheck(newEntry);
      case "OccupationalHealthcare":
        return toNewOccupationalHealthCare(newEntry);
      default:
        throw new Error("Unknown type");
    }
  }
  throw new Error("Incorrect data: a field is missing");
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("date" in discharge && "criteria" in discharge) {
    return {
      date: parseDate(discharge.date),
      criteria: parseString(discharge.criteria),
    };
  }
  throw new Error("Incorrect data: a field is missing");
};

const toNewHospital = (newEntry: BaseEntryWithoutId): EntryWithoutId => {
  if ("discharge" in newEntry) {
    return {
      ...newEntry,
      type: "Hospital",
      discharge: parseDischarge(newEntry.discharge),
    };
  }
  throw new Error("Incorrect data: a field is missing");
};

const toNewHealthCheck = (newEntry: BaseEntryWithoutId): EntryWithoutId => {
  if ("healthCheckRating" in newEntry) {
    return {
      ...newEntry,
      type: "HealthCheck",
      healthCheckRating: parseHealthRating(newEntry.healthCheckRating),
    };
  }
  throw new Error("Incorrect data: a field is missing");
};

const parseSickLeave = (sickLeave: unknown) => {
  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("startDate" in sickLeave && "endDate" in sickLeave) {
    return {
      startDate: parseDate(sickLeave.startDate),
      endDate: parseDate(sickLeave.endDate),
    };
  }
  throw new Error("Incorrect data: a field is missing");
};

const toNewOccupationalHealthCare = (
  newEntry: BaseEntryWithoutId
): EntryWithoutId => {
  if ("employerName" in newEntry) {
    return {
      ...newEntry,
      type: "OccupationalHealthcare",
      employerName: parseString(newEntry.employerName),
      sickLeave:
        "sickLeave" in newEntry
          ? parseSickLeave(newEntry.sickLeave)
          : undefined,
    };
  }
  throw new Error("Incorrect data: a field is missing");
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
