import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [countries,setCountries] = useState([])

  const [message,setMessage] = useState(null)
  const [filteredCountries,setFillteredCountries] = useState([])

  const [showDetails, setShowDetails] = useState(false);
  const [selectedCountry,setSelectedCountry] = useState({})


const hook = ()=>{
  axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((response)=>{
    setCountries(response.data)
  })
}

useEffect(hook,[])


useEffect(()=>{
  if (filteredCountries.length>10){
  setFillteredCountries([])
  setMessage('Too many matches, specify another filter.')
  }

},[filteredCountries])


  const getCountries = (event)=>{ 
  const inputText = event.target.value   

  if (inputText){
    setFillteredCountries(countries.filter(c=>c.name.common.toLowerCase().startsWith(inputText.toLowerCase())))
    setSelectedCountry({})
  }
  else
    setFillteredCountries([])
  setMessage(null)
  setSelectedCountry({})

}


const toggleData = (c)=>{
  setShowDetails(!showDetails)
  setSelectedCountry(c)
  
}

  return (
      <div>
       Find countries: <input onChange={getCountries}></input>

       {
       filteredCountries.length===1 ? 
         <CountryDetails data={filteredCountries[0]}/>
        :
        (
          filteredCountries.map((c,i)=>
          <div key={i} style={{display:'flex',gap:"10px",alignItems: 'center'}}>
          <p >{c.name.common}</p>
          <button onClick={() =>{toggleData(c)}}>show</button>
          </div>
        )
      )
          
       }
      <CountryDetails data={selectedCountry} />
      <p>{message}</p> 
      </div>
     
  )
}


const CountryDetails = ({data})=>{

  if (Object.keys(data).length>0){
  return (
  <div>
         <h1>{data.name.common}</h1>
         <p>Capital {data.capital}</p>
         <p>Area {data.area}</p>
         <h2>Languages</h2>
         
         <ul>
          { Object.values(data.languages).map((l,i)=>
              <li key={i}>{l}</li>
          )
          }
          </ul>

          <img src={data.flags.png}></img>
        </div>  
        )
  }
  
        
}

export default App
