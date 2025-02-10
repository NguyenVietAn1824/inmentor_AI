import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import PublicLayout from "./layouts/public-layout";
import HomePage from "./routes/home";
import AuthLayout from "./layouts/auth-layout";
import SignUpPage from "./routes/sign-up";
import SignInPage from "./routes/sign-in";
import ProtectedRoute from "./layouts/protectedroute";
import MainLayout from "./layouts/main-layout";
import Chatting from "./routes/Chatting/Chatting";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="chatting" element={<Chatting />} />          
      </Route>

    

        
        <Route path="/" element={<AuthLayout />}>
          
          <Route path="/signin/*" element={<SignInPage />} />
          <Route path="/signup/*" element={<SignUpPage />} />
        </Route>
        
        <Route element = {<ProtectedRoute><MainLayout></MainLayout></ProtectedRoute>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
