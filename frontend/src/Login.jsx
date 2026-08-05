import { useState } from "react";
import { useNavigate } from "react-router";

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
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">login</button>
      </form>
      <p>{message}</p>
    </div>
  )
}



export default Login