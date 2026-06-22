import React from "react";
import "../App.css";
import TopNavbar from "../components/TopNav";
import NavBar from "../components/NavBar";
import ReceiptDetailsMain from "../components/ReviewDetailsMain";

export default function ReviewDetails() {
    return(
        <div className="flex flex-1 flex-col">
            <TopNavbar/>
            <div className="flex min-h-screen">
                <NavBar/>
                <main className="flex-1 p-6">
                    <ReceiptDetailsMain/>
                </main>
            </div>
        </div>
    )
}