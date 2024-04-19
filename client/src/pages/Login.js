import React, {useState} from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { Button } from "../styles";
import styled from "styled-components";
import NavBar from "../components/NavBar";

function Login() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div>
            <NavBar />
            {showLogin ? (
                <>
                <h2>Login</h2>
                <LoginForm />
                <Divider />
                <p>
                  Don't have an account? &nbsp;
                  <Button color="secondary" onClick={() => setShowLogin(false)}>
                    Sign Up
                  </Button>
                </p>
              </>
            ) : (
            <>
                <h2>Create Account</h2>
                <SignUpForm />
                <Divider />
                <p>
                  Already have an account? &nbsp;
                  <Button color="secondary" onClick={() => setShowLogin(true)}>
                    Log In
                  </Button>
                </p>
            </>
            )
            }
        </div>
    )
};

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;

export default Login;