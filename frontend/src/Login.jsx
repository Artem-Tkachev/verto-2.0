import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Input, Button } from "./UIComponents";

function Login(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
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
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    }
    else{
      setMessage(data.error);
    }
  }

  return (
    <div>
      <form onSubmit={loginSubmit}>
        <Input placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" text="login"/>
      </form>
      <Link to="/register">register</Link>
      <p>{message}</p>
    </div>
  )
}



export default Login