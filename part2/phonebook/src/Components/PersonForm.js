import personService from "../services/personService"

const PersonForm = ({ setNewName, setNewNumber, persons, setPersons, newName, newNumber, setCrudMessage, setNotifError }) => {


    const handleNameChange = ((event) => setNewName(event.target.value))

    const handleNumberChange = ((event) => setNewNumber(event.target.value))

    const updatePersonNumber = (id, newnumber) =>{
        const findPerson = persons.find((person)=> person.id === id)
        const changedPerson = {...findPerson, number: newnumber}
        personService.update(id, changedPerson)
        .then(returnedPerson => {
            setPersons(persons.map((person) => person.id !== id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotifError(false)
            setCrudMessage(`${returnedPerson.name} number's was successfully updated.`)
            setTimeout(() => {
                setCrudMessage(null)
              }, 5000)
        })
        .catch(error =>{
            setNewName('')
            setNewNumber('')
            setNotifError(true)
            setCrudMessage(`Information of ${findPerson.name} has already been removed from server.`)
            setTimeout(() => {
                setCrudMessage(null)
              }, 5000)
        })
    }

    const addPerson = ((event) => {
        event.preventDefault()
        const differentNumber = persons.filter((person) => newName === person.name && newNumber !==person.number)
        const duplicateNameNumber = persons.some((person) => newName === person.name && newNumber ===person.number)

        if (duplicateNameNumber === true) {
            setNewName('')
            setNewNumber('')
            alert(`${newName} is already to the phonebook`)
            return
        }

        if(differentNumber.length === 1){
            if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
                updatePersonNumber(differentNumber[0].id,newNumber)
            }
            return
        }

        const newPerson = {
            name: newName,
            number: newNumber
        }

        personService.create(newPerson)
        .then(returnedPerson =>{
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotifError(false)
            setCrudMessage(`Added ${returnedPerson.name}`)
            setTimeout(() => {
                setCrudMessage(null)
              }, 5000)
        })


      
    })


    

    return (
        <form>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit" onClick={addPerson}>add</button>
            </div>
        </form>
    )
}

export default PersonForm