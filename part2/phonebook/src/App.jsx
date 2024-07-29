import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Alert from './components/Alert'
import personsService from './services/persons.js';

const App = () => {

    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')

    console.log('render', persons.length, 'people')

    const displayAlert = (alertMessage, alertType) => {
        setAlertMessage(alertMessage)
        setAlertType(alertType)
        setTimeout(() => {
            setAlertMessage(null)
        }, 5000)
    };

    useEffect(() => {
        console.log('getting initial data...')
        personsService
            .getAll()
            .then(people => {
                setPersons(people)})
    }, [])
    const handleNewFilter = (filter) => {
        setFilter(filter)
    }
    const handleNewPerson = (newPerson) => {

        personsService
            .create(newPerson)
            .then(newPerson => {
                setPersons(persons.concat(newPerson))}
            )
        const alertMessage= `name ${newPerson.name} with phone number ${newPerson.number}`
        displayAlert(alertMessage, "success")

        console.log('name', newPerson.name, 'with phone number', newPerson.number)
    }
    const handleNumberUpdate = (newPerson) => {
        const alertMessage = `Updated ${newPerson.name} with phone number ${newPerson.number}`
        personsService
            .update(newPerson.id, newPerson)
            .then(returnedPerson => {
                setPersons(persons.map(person => person.id !== newPerson.id ? person : returnedPerson))
                displayAlert(alertMessage, 'success')})
    };
    const handlePersonSubmit = (newPerson) => {
        const names = [...persons].map((person) => person.name)
        const existingPerson = names.includes(newPerson.name)

        if (!existingPerson)
        {
            handleNewPerson(newPerson)
        }
        else
        {
            let replaceNumber =
                confirm(`${newPerson.name} is already added to phonebook, replace old number?`)

            if (replaceNumber){
                handleNumberUpdate(newPerson)
            }
        }
    }
    const handleDeletePerson = (personToDelete) => {
        const errorMessage = `Information for ${personToDelete.name} has already been removed from server`
        if (confirm(`Delete ${personToDelete.name}?`))
        {
            personsService
                .deleteObject(personToDelete.id)
                .catch(() => displayAlert(errorMessage, 'error'))
                .then(() =>
                {
                    setPersons(persons.filter(person => person.id !== personToDelete.id))
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Alert message={alertMessage} type={alertType}/>
            <Filter persons={persons} onFilterChange={handleNewFilter} />
            <h3>Add a new... </h3>
            <PersonForm persons={persons} onPersonSubmit={handlePersonSubmit} />
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter} onPersonDelete={handleDeletePerson}></Persons>
        </div>
    )
}

export default App