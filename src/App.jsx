import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Routes, Route } from "react-router-dom";

export default function App(){
  return(
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/LoginPage" element={<LoginPage />} />
  <Route path="/SignupPage" element={<SignupPage />} />
</Routes>
  );
}