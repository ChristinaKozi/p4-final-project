import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import { UserContext } from "../contents/UserContext";

function Home() {
    const { user, setUser } = useContext(UserContext)

    return (
        <>
        <NavBar />
        <h1>Home</h1>
        </>
    )
}

export default Home;
