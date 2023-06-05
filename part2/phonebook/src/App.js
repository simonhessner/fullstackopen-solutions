import { useState, useEffect } from 'react'
import axios from 'axios'

let currentId = 0

const Phonebook = ({persons}) => (
  <ul>
    {
      persons.map(p => <li key={p.id}>{p.name} {p.phone}</li>)
    }
  </ul>
)

const Form = ({newName, newNameHandler, newPhone, newPhoneHandler, buttonHandler}) => (
  <form>
    <div>
      Name: <input value={newName} onChange={newNameHandler} />
    </div>
    <div>
      Phone: <input value={newPhone} onChange={newPhoneHandler} />
    </div>
    <div>
      <button type="submit" onClick={buttonHandler}>add</button>
    </div>
  </form>
)

const Filter = ({filterChangeHandler}) => (
  <p>Show only names that contain <input onChange={filterChangeHandler} /></p>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(r => {
      const initialPersons = r.data  
      setPersons(initialPersons)
      currentId = Math.max(...initialPersons.map(p => p.id).values()) + 1
    })
  }, [])

  const handler = (setter) => (event) => {
    event.preventDefault()
    setter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(p => p.name === newName) !== undefined) {
      alert("This person already exists")
      return
    }

    setPersons([
      ...persons,
      {
        name: newName,
        phone: newPhone,
        id: currentId++
      }
    ])

    setNewName('')
    setNewPhone('')
  }

  const personsToShow = filter.trim() === '' 
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter.toLocaleLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterChangeHandler={handler(setFilter)} />
      <h2>Add a new person</h2>
      <Form
        newName={newName}
        newNameHandler={handler(setNewName)}
        newPhone={newPhone}
        newPhoneHandler={handler(setNewPhone)}
        buttonHandler={addPerson}
      />
      <h2>Numbers</h2>
      <Phonebook persons={personsToShow} />
    </div>
  )
}

export default App