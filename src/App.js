import { useState } from 'react'
import Person from './components/Person'
import Pokemon from './components/Pokemon'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  var key = 0
  if (persons.length > 0){
     key = persons[persons.length - 1].id
  }
  const [lastKey, setLast] = useState(key)
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) =>{
    event.preventDefault()
    if(persons.filter((person) => person.name === newName ).length !== 0){
      alert(`${newName} is already added`)
    }
    else{
      const nameObject = {
        name: newName,
        number: `+51 ${newNumber}`,
        id: lastKey + 1,
      }
      setLast(lastKey + 1)
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
    
  }

  const handleDelete = (prop) => {
    return () => {
      setPersons(persons.filter((person) => person.id !== prop))
    }
    
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personToShow = (filter !== '') 
    ? persons.filter(person => person.name.toLowerCase().includes(filter))
    : persons


  return (
    <div>
      <h2>Phonebook</h2>
        <Pokemon></Pokemon>
        <label>
          filter shown with <input value={filter} onChange={handleFilter} />
        </label>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div style={{'display': 'flex', 'flexDirection': 'column', 'gap': '10px', 'marginBottom': '10px'}}>
          <label>
            name: <input value={newName} onChange={handleNameChange}/>
          </label>
          <label>
            number: <input value={newNumber} onChange={handleNumberChange}/>
          </label>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={{'listStyle': 'none', 'paddingLeft': '0'}}>
        {personToShow.map(person => 
            <Person key={person.id} person={person} handle={handleDelete(person.id)}/>
        )}
      </ul>
    </div>
  )
}

export default App