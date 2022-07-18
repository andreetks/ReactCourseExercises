

const Person = ({ person, handle }) =>{

    

    return (
        <li style={{'margin': '10px 0'}}>
            <div>
                {person.name} / {person.number}
                <button style={{'backgroundColor': 'red',
                'color': 'white',
                'marginLeft': '10px',
                'border' : 'none',
                'borderRadius': '5px'
                }} onClick={handle}>
                    delete
                </button>
            </div>
            
        </li>
    )
}

export default Person