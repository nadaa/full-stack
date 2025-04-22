

const Course = ({course}) =>{
    return (
      <div>
       <Header course={course.name}/>
       <Content parts = {course.parts} />
       <Total parts={course.parts}/>
     </div>
    )
  
  }
  
  
  
  const Part =(props)=>{
    return (
    <p>
      {props.details.name} {props.details.exercises}
    </p>
    )
  }
  
  const Header = (props) =>{
     return (
      <h1>{props.course}</h1>
     )
  }
  
  
  const Content = ({parts})=>{
    return(
      <div>
        {parts.map((part) =><Part details={part} key={part.id}/>)}   
      
        </div>
    )
  }
  
  
  const Total = ({parts})=>{
    return (
      <h4>Total of {parts.reduce((sum,part)=>sum+part.exercises,0)}</h4>
  
    )
  }
  
export default Course