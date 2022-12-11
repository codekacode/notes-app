import { useEffect, useState } from "react";
import Split from "react-split";
import {nanoid} from "nanoid"
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";

function App() {
   const [notes, setNotes] = useState(
     () => JSON.parse(localStorage.getItem("notes")) || []
   );

  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  )

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
    console.log(notes[0].body.split("\n"))
  }, [notes])  

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(text) {
    setNotes(oldNotes => {
      const newNotes = []
      for(let i = 0; i < oldNotes.length; i++){
        const oldNote = oldNotes[i];
        if(oldNote.id === currentNoteId){
          newNotes.unshift({...oldNote, body: text})
        } else {
          newNotes.push(oldNote)
        }
      }
      return newNotes
    })
    // setNotes(oldNotes => oldNotes.map(oldNote => {
    //   return oldNote.id === currentNoteId ? {...oldNote, body: text} : oldNote
    // }))
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId ))
  }

  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            newNote={createNewNote}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && 
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          }
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button onClick={createNewNote} className="first-note">
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
