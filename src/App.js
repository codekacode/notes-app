import { useState } from "react";
import Split from "react-split";
import {nanoid} from "nanoid"
import Sidebar from "./components/Sidebar";

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  )

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  return (
    <main>
      
        {notes.length > 0 ?
          <Split sizes={[30, 70]} direction="horizontal" className="split">
            <Sidebar notes={notes} newNote={createNewNote} />:
          </Split> 
          :
          <div>
            <h1>You have no notes</h1>
            <button onClick={createNewNote} className="">Create one now</button>
          </div>
        }
    </main>
  );
}

export default App;
