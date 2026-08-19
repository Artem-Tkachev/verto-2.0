import { Routes, Route } from "react-router-dom";
import Login from "./login";
import Registration from "./registration";
import Dashboard from "./dashboard";
import Profile from "./profile";
import { AppLayout } from "./AppLayout";
import { CreateWorkout, Workouts } from "./workouts";

function App(){
    return(
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Registration/>} />

            <Route element={<AppLayout/>}>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/workouts/upload" element={<CreateWorkout/>}/>
                <Route path="/workouts" element={<Workouts/>}/>
            </Route>
        </Routes>
    )
}

export default App