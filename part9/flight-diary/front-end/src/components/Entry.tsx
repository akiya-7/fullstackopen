import {DiaryEntry} from "../types";

interface EntryProps {
  entry: DiaryEntry;
}

const Entry = ({entry}: EntryProps) => {

  return (
    <li style={{listStyleType: 'none'}}>
      <h3>{entry.date}</h3>
      <p>
        weather: {entry.weather}<br/>
        visibility: {entry.visibility}<br/>
      </p>
    </li>)
}

export default Entry;