import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { supabase } from "./supabaseClient";

function App() {
  const history = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session === null) {
        history("/login");
      } else {
        history("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const NavbarWithRouter = (props) => <Navbar {...props} />;
  return (
    <>
      <NavbarWithRouter exact />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </>
  );
}

export default App;