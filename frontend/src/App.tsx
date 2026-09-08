import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import { useAuthContext } from "./context/AuthContext";
import Users from "./pages/user/Users";

export default function App() {
  const { loggedInUser } = useAuthContext()
  
  return (
    <Routes>
      <Route path="/" element={loggedInUser ? <Layout><Home/></Layout> : <Navigate to="/login" replace/>}/>
      <Route path="/register" element={loggedInUser ? <Navigate to="/" replace/> : <SignUp/>}/>
      <Route path="/login" element={loggedInUser ? <Navigate to="/" replace/> : <SignIn/>}/>
      <Route path="/users" element={loggedInUser ? <Layout><Users/></Layout> : <Navigate to="/login" replace/>}/>
    </Routes>
  )
}