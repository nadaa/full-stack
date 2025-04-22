import { useEffect, useReducer, useState } from 'react'
import PhoneServce from './service'
import Notification from './components/Notification'



 let currId

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [persons, setPersons] = useState([])
  
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrrorMessage] = useState(null)


  const setCurrentId = (data)=>{
    currId= data.length>0?Math.max(...data.map(p=>parseInt(p["id"],10)))+1:1

  }

  const hook = ()=>{
      PhoneServce.getAll().then(persons=>{
      setPersons(persons)
      setCurrentId(persons)
      })   
  }

  useEffect(hook,[])


  const handleNewName = (event)=>{
    setNewName(event.target.value)
  }


  const handleNewNumber= (event)=>{
    setNewNumber(event.target.value)
  }


  const handleAddPerson = (event)=>{
    event.preventDefault()

    const newPerson = {
      id:String(currId),
      name:newName,
      number: newNumber
    }
  
    const foundPerson = persons.find(p=> p.name === newName)
    
    if (foundPerson === undefined){
        PhoneServce.createPerson(newPerson).then(newPerson =>
            setPersons(persons.concat(newPerson)))
        currId += 1
        setMessage(`${newName} is added.`)

        setTimeout(() => {
            setMessage(null)
          }, 1000);
    }

    else{
      if (foundPerson.name === newName && foundPerson.number === newNumber){
        alert(`${newName} and ${newNumber} has already added to the phonebook!`)
      }

      else{
        const updatePerson = {...foundPerson,number:newNumber}
        PhoneServce.updatePerson(updatePerson).then((updatePerson)=>{
            setPersons(persons.map(p=> p.id === updatePerson.id? updatePerson:p))

            setMessage(`The number is updated for ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 1000);
                  })
        .catch((error)=>{
          setErrrorMessage(`Information of ${newName} has been already removed from the server.`)
          setTimeout(() => {
            setErrrorMessage(null)
            
          }, 1000);
        })
        
      }
    }
    
    setNewName('')
    setNewNumber('')

  }

  const handlefilter = (event)=>{
    const filteredPersons = persons.filter(p=>p.name.toLowerCase().startsWith(event.target.value.toLowerCase()))
    setPersons(filteredPersons)
  }


  const handleDeletePerson = (id)=>{
      const personToDelete = persons.find(p=>p.id=== id)
      setDeletingId(id)

      setTimeout(() => {
        const answer = confirm(`Delete ${personToDelete["name"]}?`)
        if  (answer) {
        
          PhoneServce.deletePerson(id).then(() =>{
              setPersons(persons.filter(p=> p["id"]!== id)) 
             
            })
            .catch(error =>{
              console.error("Deletion failed:", error);
            })
        }
        else{
          setDeletingId(null)
        }

      }, 300);
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message ||errorMessage} color={errorMessage?'red':'green'}></Notification>
      <Filter onChange={handlefilter}/>
      <h3>Add new</h3>
      <form onSubmit={handleAddPerson}>
       <Person valueName = {newName} valueNumber={newNumber} OnChangeName={handleNewName} onChangeNumber={handleNewNumber}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h3>Numbers</h3>
      <div >
        {persons.map((person) => 
          <div key= {person["id"]} style={{display: "flex",  gap: "10px",  alignItems:"center"}} >
          <p >{person.name} {person.number}</p> 
          <button onClick={()=>handleDeletePerson(person.id)} style={{backgroundColor: person.id === deletingId?'blue':'#e0e0e0', transition: 'background-color 0.3s'}}>delete</button>
          </div>)}
      </div>
    </div>
  )
}



const Filter = ({onChange})=>{
  return(
    <div>filter shown with
        <input onChange={onChange}></input>
      </div>
  )
}

const Person = ({valueName,valueNumber,OnChangeName,onChangeNumber})=>{
  return(
    <>
    <div>name: <input value = {valueName} onChange={OnChangeName}/></div>
    <div>number: <input value = {valueNumber} onChange={onChangeNumber} /></div>
    </>

  )
}


export default App