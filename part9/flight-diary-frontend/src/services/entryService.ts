import axios from "axios";
import { Entry, NewEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllEntries = () => {
  return axios.get<Entry[]>(baseUrl).then((response) => response.data);
};

export const createEntry = (entry: NewEntry) => {
  return axios.post<Entry>(baseUrl, entry).then((response) => response.data);
};
