import personService from "../services/personService"

const Person = ({person, persons, setPersons, setCrudMessage, setNotifError}) =>{

    const deletePerson = () =>{
       if(window.confirm(`Delete ${person.name}`)) {
           personService.deleteService(person.id)
           .then(()=>{
                setPersons(()=>persons.filter(personElement => personElement.id !== person.id))
                setNotifError(false)
                setCrudMessage(`Deleted ${person.name}`)
                setTimeout(() => {
                    setCrudMessage(null)
                  }, 5000)
           })
       }
    }

    return(
        <p key={person.name}>{person.name} {person.number} <button onClick={deletePerson}>delete</button></p>
    )
}

export default Person