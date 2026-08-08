import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router";
import { Input, Button, PasswordInput } from "./UIComponents"; 
import { Mail, User, EyeIcon, EyeOffIcon, LockKeyhole } from "lucide-react";
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
          <Input placeholder="John Doe" type="text" icon={User} label="Full Name" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <PasswordInput placeholder="Min. 8 characters" type="password" icon={LockKeyhole} label="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <PasswordInput placeholder="Repeat your password" type="password" icon={LockKeyhole} label="Confirm Password"/>
          <input className="inp-radio" type="radio" name="radio"/> <label htmlFor="radio" className="body-text">I agree with terms and shi</label>
          <Button text="Register Now" type="submit" Class="reg-button"/>
        </form>
      </div>
      <div className="bottom-text">
        <p className="body-text">Already have an account?</p>
        <Link className="link-text" onClick={navigate("/login")}>Sign in</Link>
      </div>
      <p>{message}</p>
    </div>
  )
}



export default Registration