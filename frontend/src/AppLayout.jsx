import { Outlet } from "react-router-dom"
import { SearchBar, Slidebar } from "./Sidebar"
import Dashboard from "./dashboard"

export function AppLayout(){
    return(
        <div className="dashboard-layout">
            <Slidebar/>
            <main className="main-content">
                <SearchBar/>
                <Outlet/>
            </main>
        </div>
    )
}