import React, { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import { Button, FormField, Input, Label, Error, Divider } from "../styles";
import * as yup from 'yup'
import { useFormik } from "formik";
import { headers } from "../Globals";
import { ProductContext } from "../contexts/ProductContext";
import { UserContext } from "../contexts/UserContext";

function ProductForm() {
    const { user } = useContext(UserContext)
    const { products, setProducts } = useContext(ProductContext)

    const [errors, setErrors] = useState([]);

    function handleSubmit(values, { resetForm }) {
        fetch("/products", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(values),
        })
        .then((r)=> {
            if (r.status === 201) {
                r.json().then(product=>{
                    setProducts([...products, product])
                    resetForm();
                })
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
        name: yup.string().min(3).required(),
        description: yup.string().required(),
        price: yup.number().positive().required()
    })
        
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            price: ""
        },
        validationSchema: schema,
        onSubmit: handleSubmit
    })
 
    const displayErrors = (error) => {
        return error ? <p style={{ color: "red" }}>{ error }</p> : null;
    }

    return (
        <>
        <NavBar />
        <h1>Add New Product:</h1>
        <Divider />
        { user ? <>
        <form onSubmit={ formik.handleSubmit }>
            <FormField >
                <Label>Product Name:</Label>
                <Input 
                    id='name'
                    type='text'
                    value={formik.values.name}
                    onChange={ formik.handleChange }>
                </Input>
                { displayErrors(formik.errors.name) }
            </FormField>
            <FormField >
                <Label>Description:</Label>
                <Input 
                    id='description'
                    type='text'
                    value={formik.values.description}
                    onChange={ formik.handleChange }>
                </Input>
                { displayErrors(formik.errors.description) }
            </FormField>
            <FormField >
                <Label>Price:</Label>
                <Input 
                    id='price'
                    type='text'
                    value={formik.values.price}
                    onChange={ formik.handleChange }>
                </Input>
                { displayErrors(formik.errors.price) }
            </FormField>
            <FormField>
                <Button type='submit'>Submit</Button>
            </FormField>
            <FormField>
                {errors.map((err)=>(
                    <Error key={err}>{err}</Error>
                ))}
            </FormField>
        </form> 
        </>
        : <h3>Must be logged in to post</h3> }
        </>
    )
}

export default ProductForm;