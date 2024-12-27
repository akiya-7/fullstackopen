import axios, {AxiosError} from 'axios';
import {DiaryEntry, NewDiaryEntry} from "../types";

const url = "http://localhost:3000/api/diaries";

export const getAllEntries = async () => {
  const entries = await axios.get<DiaryEntry[] >(url)
  return entries.data;
};

export const addNewEntry = async (entry: NewDiaryEntry) => {
  try {
    const newEntry = await axios.post(url, entry);
    return newEntry.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    console.error(error);
  }

}

