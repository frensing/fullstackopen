const PersonForm = ({states, service, notify}) => {
  const [persons, setPersons] = states['persons']
  const [newName, setNewName] = states['name']
  const [newNumber, setNewNumber] = states['number']

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    
    const person = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(p => p.name === newName)
    if (existingPerson !== undefined) {
      if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
        const id = existingPerson.id
        service
          .updatePerson(id, person)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== id ? p : updatedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(err => {
            notify({text: `Information of ${person.name} has already been removed from the server.`, type: 'error'})
            setTimeout(() => notify(null), 5000)
          })
      }
    } else {
      service
        .createPerson(person)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
          notify({text: `Added ${person.name}`, type: 'info'})
          setTimeout(() => notify(null), 5000)
        })
    }
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