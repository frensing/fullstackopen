import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
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
      <PersonForm states={states} />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={nameFilter} />
    </div>
  )
}

export default App