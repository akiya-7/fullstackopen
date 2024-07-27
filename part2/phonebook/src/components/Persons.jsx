const Persons = ( {persons, filter} ) => {
    let filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()))

    return(
        filteredPersons.map(person => (
        <p key={person.id}>{person.name} {person.number}</p>
        )
    ))
}

export default Persons