import { useState } from "react";

function Registration(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  async function RegSubmit(e){
    e.preventDefault();
    
    const response = await fetch("http://localhost:5000/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({username: username, password: password})
    });

    const data = await response.json();
    console.log(data);
    if(response.ok){
      setMessage(data.message);
    }
    else{
      setMessage(data.error);
    }
  }

  return (
    <div>
      <form onSubmit={RegSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  )
}



export default Registration