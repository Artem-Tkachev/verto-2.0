import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Mail, User, EyeIcon, EyeOffIcon, LockKeyhole } from "lucide-react";
import { Input, Button, PasswordInput } from "./UIComponents";

function Login(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState([]);
  const navigate = useNavigate();
  
  async function loginSubmit(e){
    e.preventDefault();
    
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({username: username, password: password})
    });

    const data = await response.json();
    console.log(data);
    if(response.ok){
      setMessage(data.message);
      setFieldErrors([]);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    }
    else{
      setMessage(data.error);
      setFieldErrors(data.fields || [])
    }
  }

  return (
    <div className="login-body">
      <div className="header">
        <h1 className="header-text-1">Welcome back</h1>
        <h2 className="header-text-2">Precision training for elite perfomance</h2>
      </div>
      <form onSubmit={loginSubmit} className="login-form">
        <Input placeholder="username" type="text" label="Username or Email" icon={User} value={username} onChange={(e) => setUsername(e.target.value)} className={fieldErrors.includes("username") ? "inp-error": ""}/>
        <PasswordInput placeholder="password" type="password" label="Password" icon={LockKeyhole} value={password} onChange={(e) => setPassword(e.target.value)} className={fieldErrors.includes("password") ? "inp-error": ""}/>
        <div className="error-body"><p className="error-text">{message}</p></div>
        <Button type="submit" text="Sign In to Dashboard"/>
        <div className="bottom-body">
          <p className="body-text bottom-reg-text">New to the platform?</p>
        </div>
        <Link to="/register" className="btn btn-secondary">Create Laboratory account</Link>
      </form>
    </div>
  )
}



export default Login