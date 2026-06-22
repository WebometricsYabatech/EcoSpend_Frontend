import React from "react";
import "../App.css";
import TopNavbar from "../components/TopNav";
import NavBar from "../components/NavBar";
import HistoryMain from "../components/HistoryMain";

export default function ReceiptHistory(){
    return(
        <div className="flex flex-1 flex-col">
            <TopNavbar/>
            <div className="flex min-h-screen">
                <NavBar/>
                <main className="flex-1 p-6">
                    <HistoryMain/>
                </main>
            </div>
        </div>
    )
}