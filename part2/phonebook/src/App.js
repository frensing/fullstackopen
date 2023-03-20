import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

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