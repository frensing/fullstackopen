interface Props {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  criteria: string;
  setCriteria: React.Dispatch<React.SetStateAction<string>>;
}

const HospitalForm = ({ date, setDate, criteria, setCriteria }: Props) => {
  return (
    <>
      Discharge Date
      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      Discharge Criteria
      <div>
        <input value={criteria} onChange={(e) => setCriteria(e.target.value)} />
      </div>
    </>
  );
};

export default HospitalForm;
