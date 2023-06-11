import { useState, useEffect } from 'react'
import server from './services/persons'
import Notification from './Notification'

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
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

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

    const existingPerson = persons.find(p => p.name === newName)
    console.log(111, existingPerson)
    if (existingPerson !== undefined) {
      if(!window.confirm(`${newName} already exists. Do you want to change their number?`)) return

      const newPerson = { ...existingPerson, phone: newPhone }
      server
        .replacePerson(newPerson)
        .then((person) => {
          setPersons(persons.map(p => p.id !== newPerson.id ? p : person))
          setNotification(`${person.name}'s number updated from ${existingPerson.phone} to ${newPhone}`)
          setTimeout(() => setNotification(null), 3000)
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== existingPerson.id))
          setError(`${existingPerson.name} has already been removed`)
          setTimeout(() => setError(null), 3000)
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
        setNotification(`${person.name} added`)
        setTimeout(() => setNotification(null), 3000)
      })
      .catch(error => {
        setError(error.response.data["error"])
        setTimeout(() => setError(null), 3000)
      })

    resetForm()
  }

  const deletePerson = person => {
    if(!window.confirm(`Delete ${person.name}?`)) return

    server
      .deletePerson(person)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))

        setNotification(`${person.name} deleted`)
        setTimeout(() => setNotification(null), 3000)
      })
      .catch(error => {
        setPersons(persons.filter(p => p.id !== person.id))
        setError(`${person.name} has already been removed`)
        setTimeout(() => setError(null), 3000)
      })
  }

  const personsToShow = filter.trim() === '' 
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter.toLocaleLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} error={false} />
      <Notification message={error} error={true} />
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