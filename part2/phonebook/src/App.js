import { useState, useEffect } from 'react'
import server from './services/persons'

const Phonebook = ({ persons, deletePerson }) => (
  <ul>
    {
      persons.map(p => (
        <li key={p.id}>
          {p.name} {p.phone} &nbsp;
           <button onClick={() => deletePerson(p)}>X</button>
        </li>
      ))
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
    server.getAllPersons().then(persons => setPersons(persons))
  }, [])

  const handler = (setter) => (event) => {
    event.preventDefault()
    setter(event.target.value)
  }

  const resetForm = () => {
    setNewName('')
    setNewPhone('')
  }

  const addPersonHandler = (event) => {
    event.preventDefault()

    let existingPerson = persons.find(p => p.name === newName)
    if (existingPerson !== undefined) {
      if(!window.confirm(`${newName} already exists. Do you want to change their number?`)) return

      const newPerson = { ...existingPerson, phone: newPhone }
      server
        .replacePerson(newPerson)
        .then((person) => {
          setPersons(persons.map(p => p.id !== newPerson.id ? p : person))
        })

      resetForm()
      return
    }

    const newPersonData = {
      name: newName,
      phone: newPhone
    }

    server.addPerson(newPersonData)
      .then(person => {
        setPersons([
          ...persons,
          person
        ])
      })

    resetForm()
  }

  const deletePerson = person => {
    if(!window.confirm(`Delete ${person.name}?`)) return
    
    server
      .deletePerson(person)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
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
        buttonHandler={addPersonHandler}
      />
      <h2>Numbers</h2>
      <Phonebook
        persons={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App