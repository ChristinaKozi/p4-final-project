import React, { useState } from "react";
import { Box, Button, Error, FormField, Input, Label, Textarea } from "../styles";

function SignUpForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <form>
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
                    type='text'
                    id='username'
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}>
                </Input>
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