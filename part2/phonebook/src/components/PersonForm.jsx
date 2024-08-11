import {useState} from "react";

const PersonForm = ({onPersonSubmit} ) => {
    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')

    const clearFields = () => {
        setNewName('')
        setNewPhoneNumber('')
    }

    const handleNameChange = (e) => {
        console.log("Name:", e.target.value)
        setNewName(e.target.value)
    }
    const handleNumberChange = (e) => {
        console.log("Phone Number", e.target.value)
        setNewPhoneNumber(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onPersonSubmit( {name: newName, number: newPhoneNumber} )
        clearFields()
    }
    return (
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
    )
}

export default PersonForm