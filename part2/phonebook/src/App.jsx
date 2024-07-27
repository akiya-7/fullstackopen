import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from "axios";

const App = () => {

    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(res => {
                console.log('promise fulfilled')
                setPersons(res.data)
            })
    }, [])
    console.log('render', persons.length, 'people')

    const handleNewFilter = (filter) => {
        setFilter(filter)
    }
    const handleNewPerson = (newPerson) => {
        const personsCopy = [...persons]
        const names = personsCopy.map((person) => person.name)

        if (names.includes(newPerson.name)) {
            alert(`${newPerson.name} is already added to phonebook`)
        } else {
            newPerson.id = (personsCopy.length + 1).toString()
            personsCopy.push(newPerson)
            setPersons(personsCopy)
            console.log('name', newPerson.name, 'with phone number', newPerson.number)
            console.log(personsCopy)
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