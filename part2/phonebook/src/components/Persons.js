
const Person = ({person}) => (<div>{person.name} - {person.number}</div>)

const Persons = ({persons, filter}) => 
  persons
    .filter(person => person.name.toLocaleLowerCase().includes(filter))
    .map(person => <Person key={person.id} person={person} />)

export default Persons