import {useCallback, useEffect, useState} from 'react'
import {DiaryEntry} from "./types";
import {getAllEntries} from "./services/diaryService"
import DiaryEntries from "./components/DiaryEntries"
import NewEntry from "./components/NewEntry";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])

  const refreshEntries = useCallback(() => {
    getAllEntries().then((res) => setDiaryEntries(res));
  }, []);

  useEffect(() => {
    refreshEntries();
  }, [refreshEntries]);


  return (
    <div>
      <NewEntry refreshEntries={refreshEntries}/>
      <DiaryEntries diaryEntries={diaryEntries}/>
    </div>
  )
}

export default App
