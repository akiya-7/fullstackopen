const Persons = ( {persons, filter, onPersonDelete} ) => {
    if (!persons || !Array.isArray(persons)) {
        return null;
    }

    let filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()))

    return(
        filteredPersons.map(person => (
            <div key={person.id}>
                <p>
                    {person.name} {person.number}
                    <button onClick={() => onPersonDelete(person)}>delete</button>
                </p>
            </div>
            )
        )
    )
}

export default Persons