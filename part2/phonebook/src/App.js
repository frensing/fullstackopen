import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

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
      
      <Filter filterState={[nameFilter, setNameFilter]} />
      
      <h3>add a new</h3>
      <PersonForm states={states} service={personService} />

      <h2>Numbers</h2>
      <Persons personState={[persons, setPersons]} filter={nameFilter} service={personService} />
    </div>
  )
}

export default App