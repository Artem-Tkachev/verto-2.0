import { useState } from "react"
import { Button, ButtonIcon, Input } from "./UIComponents"
import { useNavigate, Link } from "react-router";
import "./workouts.css"
import { Dumbbell, Zap, CircleCheck, Download, Upload } from "lucide-react";

export function CreateWorkout(){
    const [workoutName, setWorkoutName] = useState();
    const [workoutType, setWorkoutType] = useState("");
    const [workoutDate, setWorkoutDate] = useState();
    const [workoutDistance, setWorkoutDistance] = useState();
    const [workoutDuration, setWorkoutDuration] = useState();
    const [message, setMessage] = useState();
    const token = localStorage.getItem("token");

    async function RegSubmit(e){
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({workoutName: workoutName, workoutType: workoutType, workoutDate: workoutDate, workoutDuration: workoutDuration, workoutDistance: workoutDistance})
        });

        const data = await response.json();
        console.log(data);
        if(response.ok){
            setMessage(data.message);
        }
        else{
            setMessage(data.error);
        }
    }

    return(
        <div className="main-dashboard">
            <div className="header-text">
                <h1 className="text-h1">Log New <span className="text-italic">Perfomance</span> Session</h1>
            </div>
            <div className="workouts-form-block">
                <form className="workouts-form" onSubmit={RegSubmit}>
                    <div className="streak-block">
                        <Dumbbell className="streak-icon"/>
                        <p className="streak-text">Consistency is the bridge between goals and accomplishment.</p>
                        <div className="streak-bottom-block ">
                            <div className="streak-bottom-text">
                                <Zap className="streak-bottom-icon"/>
                                <p>CURRENT STREAK</p>
                            </div>
                            <div className="streak-bottom-days">
                                <p className="streak-days">12</p>
                                <p>Days</p>
                            </div>
                        </div>
                    </div>
                        <div className="workout-inputs">
                            <Input placeholder="Morning Recovery Run" type="text" variant="workout inp-group-name" label="Workout Name" onChange={(e) => setWorkoutName(e.target.value)} className="inp-name"/>
                            <div className="inp-group inp-group-workout">
                                <label className="inp-label">Type</label><br/>
                                <select className="inp inp-select inp-workout" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
                                    <option >Running</option>
                                    <option>Walking</option>
                                    <option>Cycling</option>
                                    <option>Swimming</option>
                                    <option>Hiking</option>
                                    <option>Strength Training</option>
                                    <option>Yoga</option>
                                    <option>HIIT</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <Input label="Date" type="Date" variant="workout" onChange={(e) => setWorkoutDate(e.target.value)} />
                            <Input label="Distance (km)" placeholder="5.0" type="number" variant="workout" onChange={(e) => setWorkoutDistance(e.target.value)}/>
                            <Input label="Duration (hh:mm)" placeholder="00:45" type="time" variant="workout" onChange={(e) => setWorkoutDuration(e.target.value)}/>
                        
                        <div className="bottom-btn">
                            <input type="reset" className="body-text" value="Discard"/>
                            <Input type="submit" variant="submit" icon={CircleCheck} value="Save Workout"/>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <p className="error-text">{message}</p>
            </div>
        </div>
    )
}

export function Workouts(){

    return(
        <div className="main-dashboard">
            <div className="header-dashboard">
                <div className="header-text">
                    <h1 className="text-h1">My workouts</h1>
                </div>
                <Link to="/workouts/upload" className="btn-upload">
                    <Upload className="btn-upload-icon"/>
                    <p>Upload workout</p>
                </Link>
            </div>
            <div className="statystic-block">
                <div>

                </div>
            </div>
            
        </div>
    )
}