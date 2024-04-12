import React, { useState } from "react";
import { Box, Button, Error, FormField, Input, Label, Textarea } from "../styles";

function SignUpForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                passwordConfirmation: passwordConfirmation
            }),
        }).then((r)=> {
            console.log(r)
            setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => console.log(user));
            } else {
                r.json().then((err)=> setErrors(err.errors));
            }
        });
    }
        

    return (
        <form onSubmit={handleSubmit}>
            <FormField>
                <Label>Username:</Label>
                <Input
                    type='text'
                    id='username'
                    placeholder="Username"
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}>
                </Input>
            </FormField>
            <FormField>
                <Label>Password:</Label>
                <Input
                    type='password'
                    id='password'
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}} 
                />
            </FormField>
            <FormField>
                <Label>Password Confirmation: </Label>
                <Input
                    type="password"
                    id="password_confirmation"
                    placeholder="Re-Enter Password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
            </FormField>
            <FormField>
                <Button type='submit'>{isLoading ? "Loading..." : "Sign Up"}</Button>
            </FormField>
            <FormField>
                {errors.map((err)=>(
                    <Error key={err}>{err}</Error>
                ))}
            </FormField>
        </form>
    )
}

export default SignUpForm;