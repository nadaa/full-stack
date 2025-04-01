import { useState } from 'react'



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  
  const Button = (props)=>{
    return(
    <div>
      <button onClick={props.onClick}>{props.text}</button>
    </div>
    )
  }


  const StaticLine = (props)=>{
    return(
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    )

  }

  const Statistics = (props)=>{

    const all = good+neutral+bad
    const average = (good-bad)/all
    const positivePercentage = (good/all *100).toString()+"%"

    if (good == 0 && neutral == 0 && bad==0){
      return(
        <p>no feedback given</p>
      )
    }
    else {
    return(
    <div>
    <h1>statistics</h1>
          <table>
            <tbody>
            <StaticLine text = "good" value = {good}></StaticLine>
            <StaticLine text = "neutral" value = {neutral}></StaticLine>
            <StaticLine text = "bad" value = {bad}></StaticLine>
            <StaticLine text = "all" value= {all}></StaticLine>
            <StaticLine text = "average" value = {average}></StaticLine>
            <StaticLine text = "positive" value={positivePercentage}></StaticLine>
            </tbody>
          </table>
    </div>
  )
}
  }

  return (
    <div>
      <h1> give feedback</h1>
      <div style={{ display: "flex", gap: "10px" }}>
      <Button onClick={()=>setGood(good+1)} text= "good"></Button>
      <Button onClick={()=>setNeutral(neutral+1)} text= "neutral"></Button>
      <Button onClick={()=>setBad(bad+1)} text= "bad"></Button>
      </div>
      <Statistics ></Statistics>

    </div>
  )
}

export default App
