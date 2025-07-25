import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const { userToken, user } = useContext(AuthContext);

  // Still loading user after refresh

  console.log(userToken,user);
  
  if (userToken && !user) {
    return <div className="text-center p-10">Loading...</div>; // Or your loader
  }

  if (!userToken) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/login" />;

  return children;
}
