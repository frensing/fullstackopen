
const Person = ({ person, deletePerson }) => (
  <div>{person.name} - {person.number} <button onClick={deletePerson}>delete</button>
  </div>
)

const Persons = ({personState, filter, service}) => {
  const [persons, setPersons] = personState

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      service
        .deletePerson(person.id)
        .then(res => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  return persons
    .filter(person => person.name.toLocaleLowerCase().includes(filter))
    .map(person => <Person 
      key={person.id} 
      person={person} 
      deletePerson={() => deletePerson(person)} />)
}
  

export default Persons