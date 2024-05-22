import { useEffect, useState } from "react";
import { Entry } from "./types";
import { getAllEntries } from "./services/entryService";
import EntryForm from "./components/EntryForm";

const App = () => {
  const [diaries, setDiaries] = useState<Entry[]>([]);

  useEffect(() => {
    getAllEntries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <>
      <h1>Flight Diary</h1>
      <EntryForm diaries={diaries} setDiaries={setDiaries} />
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
