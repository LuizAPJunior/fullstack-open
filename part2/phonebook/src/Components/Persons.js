import Person from "./Person"

const Persons = ({persons, searchName, setPersons, setCrudMessage, setNotifError}) => {
    const regexSearch = new RegExp(searchName, "i")
    const personsToShow = searchName ? persons.filter((person) => person.name.match(regexSearch)) : persons
    return (
         personsToShow.map((person) => <Person key={person.name} person={person} setPersons={setPersons} persons={persons} setCrudMessage={setCrudMessage} setNotifError={setNotifError}/>)
    )
}

export default Persons