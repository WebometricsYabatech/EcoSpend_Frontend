import React from "react";
import "../App.css";
import TopNavbar from "../components/TopNav";
import NavBar from "../components/NavBar";
import ProfileMain from "../components/ProfileMain";

export default function ProfileAndSettings(){
    return(
        <div className="flex flex-1 flex-col">
            <TopNavbar/>
            <div className="flex min-h-screen">
                <NavBar/>
                <main className="flex-1 p-6">
                    <ProfileMain/>
                </main>
            </div>
        </div>
    )
}