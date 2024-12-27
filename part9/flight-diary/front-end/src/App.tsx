import {useEffect, useState} from 'react'
import {DiaryEntry} from "./types";
import {getAllEntries} from "./services/diaryService"
import Entry from "./components/Entry"

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getAllEntries().then(res => setDiaryEntries(res))
  }, []);

  return (
    <div>
      <ul>
        {diaryEntries.length > 0 ? diaryEntries.map((entry: DiaryEntry) => {
          return (<Entry key={entry.id} entry={entry}/>)
        }) : null}
      </ul>
    </div>
  )
}

export default App
