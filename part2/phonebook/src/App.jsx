import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personsService from './services/persons.js';

const App = () => {

    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        console.log('effect')
        personsService
            .getAll()
            .then(people => setPersons(people))
    }, [])
    console.log('render', persons.length, 'people')

    const handleNewFilter = (filter) => {
        setFilter(filter)
    }
    const handleNewPerson = (newPerson) => {
        const names = [...persons].map((person) => person.name)

        if (names.includes(newPerson.name)) {
            alert(`${newPerson.name} is already added to phonebook`)
        } else {
            newPerson.id = (names.length + 1).toString()
            personsService
                .create(newPerson)
                .then(newPerson => {
                    setPersons(persons.concat(newPerson))
                })
            console.log('name', newPerson.name, 'with phone number', newPerson.number)
            console.log(persons.concat(newPerson))
        }
    }
    const handleDeletePerson = (id) => {
        if (confirm("woah there bucko, are you sure?") === true){
            personsService
                .deleteObject(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                })
        }
    }


    return (
        <div>
            <h2>Phonebook</h2>

            <Filter persons={persons} onFilterChange={handleNewFilter} />

            <h3>Add a new... </h3>
            <PersonForm persons={persons} onPersonSubmit={handleNewPerson} />

            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter} onPersonDelete={handleDeletePerson}></Persons>
        </div>
    )
}

export default App