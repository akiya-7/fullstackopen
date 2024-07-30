const Persons = ( {persons, filter, onPersonDelete} ) => {
    if (!persons || !Array.isArray(persons)) {
        return null;
    }

    let filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()))

    return(
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Phone Number</th>
            </tr>
            </thead>
            <tbody>
            {filteredPersons.map(person => (
                <tr key={person.id}>
                    <td>{person.name}</td>
                    <td>{person.number}</td>
                    <td>
                        <button onClick={() => onPersonDelete(person)}>delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Persons