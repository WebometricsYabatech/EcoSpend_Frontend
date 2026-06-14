import React from 'react';
import '../App.css';
import SignupLHS from "../components/SignupLHS";
import SignupRHS from "../components/SignupRHS";

export default function SignupPage() {
  return(
    <div className="Signup-Page">

    <SignupLHS/>
    <SignupRHS/>

    </div>
  );
}