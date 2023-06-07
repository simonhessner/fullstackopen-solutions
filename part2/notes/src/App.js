import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Note from './components/Note'
import Notification from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
    marginTop: 20
  }

  return (
    <div style={footerStyle}>
      <em>Note app</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
      noteService
        .getAll()
        .then(allNotes => setNotes(allNotes))
    }, []
  )

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService
      .create(noteObject)
      .then(note => {
        setNotes(notes.concat(note))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const toggleImportance = (note) => {
    const { id } = note
    const changedNote = { ...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(note => {
        setNotes(notes.map(n => n.id !== id ? n: note))
      })
      .catch(error => {
        setErrorMessage('This note was already deleted from the server')
        setTimeout(() => setErrorMessage(null), 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div> 
      <ul>
        <ul>
          {notesToShow.map(note => 
            <Note 
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportance(note)}
            />
          )}
        </ul>
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
