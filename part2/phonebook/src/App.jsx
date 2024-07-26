import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
    const [filter, setFilter] = useState('')

    const handleNewFilter = (filter) => {
        setFilter(filter)
    }
    const handleNewPerson = (newPerson) => {
        const personsCopy = [...persons]
        const names = personsCopy.map((person) => person.name)

        console.log(names,newPerson.name,)
        if (names.includes(newPerson.name)) {
            alert(`${newPerson.name} is already added to phonebook`)
        } else {
            personsCopy.push(newPerson)
            setPersons(personsCopy)
            console.log('name', newPerson.name, 'with phone number', newPerson.phoneNumber)
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter persons={persons} onFilterChange={handleNewFilter} />

            <h3>Add a new... </h3>
            <PersonForm persons={persons} onPersonSubmit={handleNewPerson} />

            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter}></Persons>
        </div>
    )
}

export default App