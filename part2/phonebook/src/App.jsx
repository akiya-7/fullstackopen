import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')

    const clearFields = () => {
        setNewName('')
        setNewPhoneNumber('')
    }

    const handleNameChange = (e) => {
        console.log(e.target.value)
        setNewName(e.target.value)
    }
    const handleNumberChange = (e) => {
        console.log(e.target.value)
        setNewPhoneNumber(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newPersons = [...persons]
        const peopleNames = newPersons.map((person) => person.name)

        if (peopleNames.includes(newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            newPersons.push({name: newName, phoneNumber: newPhoneNumber})
            setPersons(newPersons)
            console.log('name', newName, 'with phone number', newPhoneNumber)
            clearFields()
        }
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
                    number: <input
                    value={newPhoneNumber}
                    onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => (
                <p key={person.name}>{person.name} {person.phoneNumber}</p>
            ))}
        </div>
    )
}

export default App