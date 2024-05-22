import { useEffect, useState } from "react";
import { Diary } from "./types";
import { getAllDiaries } from "./diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <>
      <h2>Diary Entries</h2>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <b>{diary.date}</b>
            <br />
            visibility: {diary.visibility}
            <br />
            weather: {diary.weather}
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
