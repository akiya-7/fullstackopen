import {FormEvent, useState} from "react";
import {addNewEntry} from "../services/diaryService";
import {NewDiaryEntry} from "../types";
import Alert from "../components/Alert"

interface NewDiaryEntryProps {
  refreshEntries: () => void;
}

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
        date, weather, visibility, comment
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
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Weather:</label>
          <input
            type="text"
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>
        <div>
          <label>Visibility:</label>
          <input
            type="text"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
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