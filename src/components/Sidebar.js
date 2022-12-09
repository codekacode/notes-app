import React from 'react'

function Sidebar(props) {

  const notesElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div onClick={() => props.setCurrentNoteId(note.id)}>
        <h4>Note {index + 1}</h4>
      </div>
    </div>
  ))

  return (
    <section>
      <div>
        <h3>Notes</h3>
        <button onClick={props.newNote}>+</button>
      </div>
      {notesElements}
    </section>
  )
}

export default Sidebar