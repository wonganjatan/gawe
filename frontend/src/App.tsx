import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import SignUp from "./pages/auth/SignUp";

export default function App() {
  return (
    <Routes>
      <Route path="/register" element={<Layout><SignUp/></Layout>}/>
      <Route path="/" element={<Layout><Home/></Layout>}/>
    </Routes>
  )
}