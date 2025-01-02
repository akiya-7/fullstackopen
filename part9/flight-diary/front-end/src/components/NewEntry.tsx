import {FormEvent, useState} from "react";
import {addNewEntry} from "../services/diaryService";
import {NewDiaryEntry} from "../types";
import Alert from "../components/Alert"
import * as _ from "lodash";

interface NewDiaryEntryProps {
  refreshEntries: () => void;
}

const weatherOptions = ["sunny", "rainy", "cloudy", "stormy", "windy"];
const visibilityOptions = ["great", "good", "ok", "poor"]

const NewEntry = ({refreshEntries}: NewDiaryEntryProps) => {

  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const clearForm = () => {
    setDate("");
    setWeather("");
    setVisibility("");
    setComment("");


  };

  const displayAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage("");
    }, 5000);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

      const diaryEntry: NewDiaryEntry = {
        date, weather , visibility, comment
      }

      addNewEntry(diaryEntry).then((res: unknown) => {
        console.log(res)
        clearForm()
        refreshEntries()
      }).catch((err) => {
        console.log(err.response)
        displayAlert(err.response.data);
      })
  };

  return (
    <div key={"new-diary-entry"}>
      <h2>Add New Entry:</h2>
      <Alert alertMessage={alertMessage}/>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Date:</label>
          <input
            type={"date"}
            value={date}
            name={"date"}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Weather:</label>
          {weatherOptions.map((option) => (
            <label key={option}>
              <input
                name="weather"
                type="radio"
                value={option}
                checked={weather === option}
                onChange={() => setWeather(option)}
              />
              {_.capitalize(option)}
            </label>
          ))}
        </div>
        <div>
          <label>Visibility:</label>
          {visibilityOptions.map((option) => (
            <label key={option}>
              <input
                name="visibility"
                type="radio"
                value={option}
                checked={visibility === option}
                onChange={() => setVisibility(option)}
              />
              {_.capitalize(option)}
            </label>
          ))}
        </div>
        <div>
          <label>Comment:</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Add Entry</button>
      </form>
    </div>
  )
    ;
}

export default NewEntry