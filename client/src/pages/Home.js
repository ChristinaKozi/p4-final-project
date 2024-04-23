import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import { UserContext } from "../contexts/UserContext";
import { Divider } from "../styles";

function Home() {
    const { user } = useContext(UserContext)

    return (
        <>
        <NavBar />
        <h1>Home</h1>
        <Divider/>
        <h2>Hi, {user.username}!</h2>
        <p>Welcome to our online forum where you can navigate through products 
            and there reviews to choose which products work best for you! </p>
            
        <p>If you love (or hate) a product and would like to recommend it to others (or warn them),
             you can create a product listing of your own!</p>
        </>
    )
}

export default Home;
