import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Input, Button } from "./UIComponents"; 
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
    <div className="login-body">
      <div className="header">
        <div><h1 className="header-text-1 text">Create your account</h1></div>
        <div><h2 className="header-text-2 text">Join Ver  to to start tracking your elite perfomance</h2><br/></div>
      </div>
      <div>
        <form className="login-form" onSubmit={RegSubmit}>
          <div>
            <label className="inp-label">Full Name</label><br/>
            <Input placeholder="John Doe" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/><br/>
          </div>
          <div>
          <label className="inp-label">Password</label><br/>
          <Input placeholder="Min. 8 characters" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
          </div>
          <div>
            <label className="inp-label">Confirm Password</label><br/>
            <Input placeholder="Repeat your password"/>
          </div>
          
          <input className="inp-radio" type="radio"/> <label>I agree with terms and shi</label>
          <Button text="Register Now" type="submit" Class="reg-button"/>
        </form>
      </div>
      <div className="buttom-text">
        <p>Already have an account?</p>
        <button>Sign in</button>
      </div>
      <p>{message}</p>
    </div>
  )
}



export default Registration