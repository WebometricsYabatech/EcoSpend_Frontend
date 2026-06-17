import React from "react";
import "../App.css";
import NavBar from '../components/NavBar';
import TopNavbar from "../components/TopNav";
import UploadMain from "../components/UploadMain";

export default function UploadReceipt(){
    return(
        <div className="flex flex-1 flex-col">
            <TopNavbar/>
            <div className="flex min-h-screen">
                <NavBar/>

                <main className="flex-1 p-6">
                    <UploadMain/>
                </main>
            </div>
        </div>
    )
}