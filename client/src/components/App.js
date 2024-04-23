import React, { useContext } from "react";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { UserContext } from "../contexts/UserContext";

function App() {
  const { user } = useContext(UserContext)

  if (!user) return <Login />;
  
  return (
    <>
      <Home />
    </>
  )
}

export default App;
