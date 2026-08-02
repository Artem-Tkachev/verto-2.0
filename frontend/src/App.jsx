import { Routes, Route } from "react-router-dom";
import Login from "./login";
import Registration from "./registration";

function App(){
    return(
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/registration" element={<Registration/>} />
        </Routes>
    )
}

export default App