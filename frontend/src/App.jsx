import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Registration from "./registration";
import Dashboard from "./dashboard";
import { Profile, SearchUser, ShowProfile } from "./profile";
import { AppLayout } from "./AppLayout";
import { CreateWorkout, Workouts } from "./workouts";

function App(){
    return(
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Registration/>} />

            <Route element={<AppLayout/>}>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/workouts/upload" element={<CreateWorkout/>}/>
                <Route path="/workouts" element={<Workouts/>}/>
                <Route path="/search" element={<SearchUser/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/profile/:username" element={<ShowProfile/>}/>
            </Route>
        </Routes>
    )
}

export default App