const Persons = ( {persons, filter} ) => {
    let filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()))

    return(
        filteredPersons.map(person => (
        <p key={person.name}>{person.name} {person.phoneNumber}</p>
        )
    ))
}

export default Persons