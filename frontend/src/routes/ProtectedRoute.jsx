import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children,role}) {

    const {user}= useContext(AuthContext);

    if(!user || user.role !==role)
    {
        return <Navigate to="/login" />
    }
  return children;
}


