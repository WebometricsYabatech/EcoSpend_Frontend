import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Welcome from "./pages/Welcome";
import UploadReceipt from "./pages/UploadReceipt";

export default function App(){
  return(
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/LoginPage" element={<LoginPage />} />
  <Route path="/SignupPage" element={<SignupPage />} />
  <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
  <Route path="Welcome" element={<Welcome/>}/>
  <Route path= "UploadReceipt" element={<UploadReceipt/>}/>
</Routes>
  );
}