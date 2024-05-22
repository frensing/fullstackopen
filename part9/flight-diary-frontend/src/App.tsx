import React, { useEffect, useState } from "react";
import { Entry } from "./types";
import { getAllEntries, createEntry } from "./entryService";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<Entry[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newVisibility, setNewVisibility] = useState("");
  const [newWeather, setNewWeather] = useState("");
  const [newComment, setNewComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllEntries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createEntry({
      date: newDate,
      visibility: newVisibility,
      weather: newWeather,
      comment: newComment,
    })
      .then((data) => {
        setDiaries(diaries.concat(data));

        setNewDate("");
        setNewVisibility("");
        setNewWeather("");
        setNewComment("");
      })
      .catch((e) => {
        if (axios.isAxiosError(e) && e.response) {
          setErrorMessage(e.response.data);
          setTimeout(() => setErrorMessage(""), 5000);
        } else {
          setErrorMessage("Unknown Error");
          setTimeout(() => setErrorMessage(""), 5000);
        }
      });
  };

  return (
    <>
      <h1>Flight Diary</h1>
      <h3>Add new entry</h3>
      <p style={{ color: "#F00" }}>{errorMessage}</p>
      <form onSubmit={entryCreation}>
        Date{" "}
        <input
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)}
        />
        <br />
        Visibility:
        <input
          value={newVisibility}
          onChange={(event) => setNewVisibility(event.target.value)}
        />
        <br />
        Weather:
        <input
          value={newWeather}
          onChange={(event) => setNewWeather(event.target.value)}
        />
        <br />
        Comment:
        <input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <br />
        <button type="submit">add</button>
      </form>
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
