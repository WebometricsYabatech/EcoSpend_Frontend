import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Welcome from "./pages/Welcome";
import UploadReceipt from "./pages/UploadReceipt";
import ProcessingPage from "./pages/ProcessingPage";
import ReviewPage from "./pages/RewiewPage";
import ReviewDetails from "./pages/ReviewDetails";
import ReceiptHistory from "./pages/ReceiptHistory";
import Dashboard from "./pages/Dashboard";
import ProfileAndSettings from "./pages/ProfileAndSettings";

export default function App(){
  return(
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/LoginPage" element={<LoginPage />} />
  <Route path="/SignupPage" element={<SignupPage />} />
  <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
  <Route path="Welcome" element={<Welcome/>}/>
  <Route path= "UploadReceipt" element={<UploadReceipt/>}/>
  <Route path= "ProcessingPage" element={<ProcessingPage/>}/>
  <Route path="ReviewPage" element={<ReviewPage/>}/>
  <Route path="ReviewDetails" element={<ReviewDetails/>}/>
  <Route path="ReceiptHistory" element={<ReceiptHistory/>}/>
  <Route path="Dashboard" element={<Dashboard/>}/>
  <Route path="ProfileAndSettings" element={<ProfileAndSettings/>}/>
</Routes>
  );
}