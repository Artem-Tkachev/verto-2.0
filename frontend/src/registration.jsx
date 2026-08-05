import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Input } from "./UIComponents";
import './UIComponents.css'

function Registration(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  async function RegSubmit(e){
    e.preventDefault();
    
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({username: username, password: password})
    });

    const data = await response.json();
    console.log(data);
    if(response.ok){
      setMessage(data.message);
      navigate("/login");
    }
    else{
      setMessage(data.error);
    }
  }

  return (
    <div class="login-body">
      <div class="header">
        <div><h1 class="header-text">Create your account</h1><br/></div>
        <div><h2>Join Verto to start tracking your elite perfomance</h2><br/></div>
      </div>
      <div class="login-form">
        <form onSubmit={RegSubmit} >
          <label>Full name</label><br/>
          <Input placeholder="John Doe" type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br/>
          <label>Password</label><br/>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
          <button type="submit">Register Now</button>
        </form>
      </div>
      <p>{message}</p>
    </div>
  )
}



export default Registration