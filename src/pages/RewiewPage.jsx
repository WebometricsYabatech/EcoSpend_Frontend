import React from "react";
import "../App.css";
import TopNavbar from "../components/TopNav";
import NavBar from "../components/NavBar";
import ReviewMain from "../components/Reviewmain";

export default function ReviewPage(){
    return(
        <div className="flex flex-1 flex-col">
            <TopNavbar/>
            <div className="flex min-h-screen">
                <NavBar/>
                <main className="flex-1 p-6">
                    <ReviewMain/>
                </main>
            </div>
        </div>
    )
}
