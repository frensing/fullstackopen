interface Props {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const OccupationalHealthcareForm = ({
  employerName,
  setEmployerName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) => {
  return (
    <>
      Employer Name
      <div>
        <input
          value={employerName}
          onChange={(e) => setEmployerName(e.target.value)}
        />
      </div>
      Sick leave start date
      <div>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      Sick leave end date
      <div>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </>
  );
};

export default OccupationalHealthcareForm;
