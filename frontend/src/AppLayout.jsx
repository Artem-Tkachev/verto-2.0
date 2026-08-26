import { Outlet } from "react-router-dom"
import { SearchBar, Slidebar } from "./Sidebar"

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