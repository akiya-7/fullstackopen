import {DiaryEntry} from "../types";
import Entry from "./Entry";

interface DiaryEntriesProps {
  diaryEntries: DiaryEntry[];
}

const DiaryEntries = ({diaryEntries}: DiaryEntriesProps) => {
  return (
    <div key={"diary-entries"}>
      <ul>
        {diaryEntries.length > 0 ? diaryEntries.map((entry: DiaryEntry) => {
          return (<Entry key={entry.id} entry={entry}/>)
        }) : null}
      </ul>
    </div>
  )
}

export default DiaryEntries;