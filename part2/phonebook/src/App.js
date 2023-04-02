import { useState, useEffect } from 'react'

import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notification, setNotification] = useState(null)  

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const states = {
    persons: [persons, setPersons],
    name: [newName, setNewName],
    number: [newNumber, setNewNumber]
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />
      
      <Filter filterState={[nameFilter, setNameFilter]} />
      
      <h3>add a new</h3>
      <PersonForm states={states} service={personService} notify={setNotification} />

      <h2>Numbers</h2>
      <Persons personState={[persons, setPersons]} filter={nameFilter} service={personService} />
    </div>
  )
}

export default App