import {FormEvent, useState} from "react";
import {addNewEntry} from "../services/diaryService";
import {NewDiaryEntry} from "../types";

interface NewDiaryEntryProps {
  refreshEntries: () => void;
}

const NewEntry = ({refreshEntries}: NewDiaryEntryProps) => {

  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const diaryEntry: NewDiaryEntry = {
      date, weather, visibility, comment
    }
    addNewEntry(diaryEntry).then((res: unknown) => {
      console.log(res)
      refreshEntries()
    })
  }

  return (
    <div key={"new-diary-entry"}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Date:</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Weather:</label>
          <input
            type="text"
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Visibility:</label>
          <input
            type="text"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Comment:</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Entry</button>
      </form>
    </div>
  )
    ;
}

export default NewEntry