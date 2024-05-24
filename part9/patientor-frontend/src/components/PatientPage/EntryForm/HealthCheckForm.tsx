interface Props {
  healthRating: string;
  setHealthRating: React.Dispatch<React.SetStateAction<string>>;
}

const HealthCheckForm = ({ healthRating, setHealthRating }: Props) => {
  return (
    <>
      Healthcheck rating
      <div>
        <input
          value={healthRating}
          onChange={(e) => setHealthRating(e.target.value)}
        />
      </div>
    </>
  );
};

export default HealthCheckForm;
