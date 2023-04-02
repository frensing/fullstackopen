const PersonForm = ({states, service}) => {
  const [persons, setPersons] = states['persons']
  const [newName, setNewName] = states['name']
  const [newNumber, setNewNumber] = states['number']

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.filter(person => person.name === newName).length !== 0) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    
    const person = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    service
      .create(person)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  return (
    <> 
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )

}

export default PersonForm