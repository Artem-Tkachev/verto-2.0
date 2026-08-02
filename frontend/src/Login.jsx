import { useState } from "react";

function Login(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div>
      <form>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">login</button>
      </form>
      
    </div>
  )
}

export default Login