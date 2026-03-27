import { Routes, Route } from "react-router-dom";

import Login from "../../features/auth/pages/Login.jsx";
import Settings from "../../features/settings/pages/Settings.jsx";
import Register from "../../features/auth/pages/Register.jsx";
import Verify from "../../features/auth/pages/Verify.jsx";
import VerifyEmail from "../../features/auth/pages/VerifyEmail.jsx";
import ProtectedRoute from "../../features/auth/routes/ProtectedRoutes.jsx";
import Home from "../../features/home/pages/home.jsx";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/settings" element={<Settings/>} />
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>} />

    </Routes>

  );
};

export default AppRoutes;