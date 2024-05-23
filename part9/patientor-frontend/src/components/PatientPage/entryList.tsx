import { useEffect, useState } from "react";
import { Diagnosis, Entry } from "../../types";
import diagnoseService from "../../services/diagnoses";

interface Props {
  entries: Entry[];
}

const EntryList = ({ entries }: Props) => {
  return (
    <>
      <h4>Entries</h4>
      {entries.map((entry, i) => (
        <div key={i}>
          <p>
            {entry.date}: {entry.description}
          </p>
          {entry.diagnosisCodes ? (
            <CodeList codes={entry.diagnosisCodes} />
          ) : null}
        </div>
      ))}
    </>
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
