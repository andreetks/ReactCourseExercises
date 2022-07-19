import { useState, useEffect } from 'react'
import Person from './components/Person'
import numberServices from './services/numbers'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [lastKey, setLast] = useState(0)
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [color, setColor] = useState('green')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.filter((person) => person.name === newName).length !== 0) {
      const person = persons.find(num => num.name === newName)
      const changeNumber = {
        ...person, number: newNumber
      }
      if (window.confirm(`${newName} is already added to list, replace the old number with a new one?`)){
        numberServices
          .update(changeNumber.id, changeNumber)
          .then(returnedNumber =>{
            setPersons(persons.map(person => person.id !== returnedNumber.id ? person : returnedNumber))
            setColor('green')
            setNotification(`Update ${returnedNumber.name}'s number`)
            setTimeout(()=>{
              setNotification(null)
            },5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error=>{
            setColor('red')
            setNotification(`Information of ${person.name} has already been removed from server`)
            setTimeout(()=>{
              setNotification(null)
            },5000)
            setNewName('')
            setNewNumber('')
          })
      }

    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: lastKey + 1,
      }
      numberServices
        .create(nameObject)
        .then(returnedNumber => {
          setLast(lastKey + 1)
          setPersons(persons.concat(returnedNumber))
          setColor('green')
          setNotification(`Added ${returnedNumber.name}`)
            setTimeout(()=>{
              setNotification(null)
            },5000)
          setNewName('')
          setNewNumber('')
        })

    }

  }

  const handleDelete = (prop) => {
    return () => {
      if (window.confirm('Do you really want to delete?')){
        numberServices.remove(prop)
        setPersons(persons.filter((person) => person.id !== prop))
        
      }
      
      
    }

  }
  useEffect(
    () => {
      numberServices
        .getAll()
        .then(data =>{
          setPersons(data)
          setLast(data[data.length - 1].id)
        })
    }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personToShow = (filter !== '')
    ? persons.filter(person => person.name.toLowerCase().includes(filter))
    : persons


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} color={color}/>
      <label>
        filter shown with <input value={filter} onChange={handleFilter} />
      </label>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div style={{ 'display': 'flex', 'flexDirection': 'column', 'gap': '10px', 'marginBottom': '10px' }}>
          <label>
            name: <input value={newName} onChange={handleNameChange} />
          </label>
          <label>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </label>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={{ 'listStyle': 'none', 'paddingLeft': '0' }}>
        {personToShow.map(person =>
          <Person key={person.id} person={person} handle={handleDelete(person.id)} />
        )}
      </ul>
    </div>
  )
}

export default App