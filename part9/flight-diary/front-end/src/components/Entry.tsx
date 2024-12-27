import {DiaryEntry} from "../types";

interface EntryProps {
  entry: DiaryEntry;
}

const Entry = (props: EntryProps) => {
  const entry = props.entry;

  return (
    <li style={{listStyleType: 'none'}}>
      <h3>{entry.date}</h3>
      <p>
        weather: {entry.weather}<br/>
        visibility: {entry.visibility}
      </p>
    </li>)
}

export default Entry;