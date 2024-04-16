import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import NavBar from "./NavBar";
import Home from "../pages/Home";


function App() {

  const [user, setUser] = useState(null)
 
  useEffect(() => {
      // auto-login
      fetch("/checksession").then((r) => {
        if (r.status == 200) {
          r.json().then((user) => setUser(user));
        }
      });
    }, []);
  
  if (!user) return <Login onLogin={setUser} />;
  
  return (
    <>
      <Home user={user} setUser={setUser}/>
    </>
  )
}

export default App;
