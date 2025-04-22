const Notification = ({ message,color }) => {
    
    if (message=== null) {
      return null
    }
  
    return <div className="message" style={{'color':color}}>{message}</div>
  }
  
  export default Notification