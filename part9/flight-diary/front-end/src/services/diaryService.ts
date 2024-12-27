import axios from 'axios';
import {DiaryEntry} from "../types";

const url = "http://localhost:3000/api/diaries";

export const getAllEntries = async () => {
  const entries = await axios.get<DiaryEntry[] >(url)
  return entries.data;
};

