import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const handleNameChange = (e) => {
        console.log(e.target.value)
        setNewName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('name', newName, 'submitted.')
        const newPersons = [...persons]
        newPersons.push({name: newName})
        setPersons(newPersons)
        setNewName('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input
                value={newName}
                onChange={handleNameChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => (
                <p key={person.name}>{person.name}</p>
            ))}
        </div>
    )
}

export default App