import React, { useEffect, useState, useContext } from "react";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { UserContext } from "../contents/UserContext";


function App() {

  const { user, setUser } = useContext(UserContext)

  
  if (!user) return <Login />;
  
  return (
    <>
      <Home />
    </>
  )
}

export default App;
