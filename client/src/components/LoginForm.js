import React, { useState, useContext } from "react";
import { Button, Error, FormField, Input, Label } from "../styles";
import * as yup from 'yup'
import { useFormik } from "formik";
import { headers } from "../Globals";
import { UserContext } from "../contexts/UserContext";

function LoginForm() {
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { setUser } = useContext(UserContext)

    function handleSubmit(values) {
        setIsLoading(true);
        fetch("/login", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(values),
        })
        .then((r)=> {
            setIsLoading(false);
            if (r.status === 200) {
                r.json()
                .then(user=>{setUser(user)})
            } else {
                r.json().then((data)=> {
                    if (data.error) {
                        setErrors([data.error])
                    } else {
                        setErrors(data.errors);
                    }
                });
            }
        })
    }

    const schema = yup.object({
        username: yup.string().min(3).required(),
        password: yup.string().required()
    })
        
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: schema,
        onSubmit: handleSubmit
    })
 
    const displayErrors = (error) => {
        return error ? <p style={{ color: "red" }}>{ error }</p> : null;
    }

return (
    <form onSubmit={ formik.handleSubmit }>
        <FormField>
            <Label>Username:</Label>
            <Input
                type='text'
                id='username'
                placeholder="Username"
                value={formik.values.username}
                onChange={ formik.handleChange }>
            </Input>
            { displayErrors(formik.errors.username) }
        </FormField>
        <FormField>
            <Label>Password:</Label>
            <Input
                type='password'
                id='password'
                placeholder="Password"
                value={formik.values.password}
                onChange={ formik.handleChange } 
            />
            { displayErrors(formik.errors.password) }
        </FormField>
        <FormField>
            <Button type='submit'>{isLoading ? "Loading..." : "Log in"}</Button>
        </FormField>
        <FormField>
            {errors.map((err)=>(
                <Error key={err}>{err}</Error>
            ))}
      </FormField>
    </form>
)}

export default LoginForm;