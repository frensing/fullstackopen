import { Entry } from "../../types";

interface Props {
  entries: Entry[];
}

const EntryList = ({ entries }: Props) => {
  console.log(entries);

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
  return (
    <ul>
      {codes.map((code) => (
        <li key={code}>{code}</li>
      ))}
    </ul>
  );
};

export default EntryList;
