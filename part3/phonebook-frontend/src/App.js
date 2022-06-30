import { useState, useEffect } from 'react'


import Filter from './Components/Filter'
import Notification from './Components/Notification'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personService from './services/personService'

import './styles/index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [crudMessage, setCrudMessage] = useState(null)
  const [notifError, setNotifError] = useState(false)

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])





  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={crudMessage}  notifError={notifError}/>
      <Filter setSearchName={setSearchName} />
      <PersonForm persons={persons} setPersons={setPersons} newName={newName}
        setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} setCrudMessage={setCrudMessage} setNotifError={setNotifError} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchName={searchName} setPersons={setPersons} setCrudMessage={setCrudMessage} setNotifError={setNotifError} />
    </div>
  )
}

export default App