const Person = ({person, handle}) => {
    return (
      <li style={{'padding':'7px 0'}}>
        <span style={{'paddingRight': '10px'}}>{person.name} / {person.number}</span>
        <button style={{'width':'30px','background': 'red', 'border': '1px solid black', 'color': 'white', 'borderRadius': '5px'}} 
        onClick={handle}>X</button>
      </li>
    )
  }
  
export default Person