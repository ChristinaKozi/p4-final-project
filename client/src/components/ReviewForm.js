import React, { useState, useContext } from "react";
import { Button, FormField, Input, Label, Error } from "../styles";
import * as yup from 'yup'
import { useFormik } from "formik";
import { headers } from "../Globals";
import { UserContext } from "../contents/UserContext";


function ReviewForm({ product, reviews, setReviews }) {

    const [errors, setErrors] = useState([]);
    const [showReviewForm, setShowReviewForm ] = useState(false)

    const { user } = useContext(UserContext)

    function handleSubmit(values, { resetForm }) {
        fetch("/reviews", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(values),
        })
        .then((r)=> {
            if (r.status === 201) {
                r.json().then(review=>{
                    setReviews([...reviews, review])
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
        rating: yup.number().positive().min(1).max(5).required(),
        comment: yup.string().min(3).required()
    })
        
    const formik = useFormik({
        initialValues: {
            rating: "",
            comment: "",
            product_id: product.id,
            user_id: user.id
        },
        validationSchema: schema,
        onSubmit: handleSubmit
    })
 
    const displayErrors = (error) => {
        return error ? <p style={{ color: "red" }}>{ error }</p> : null;
    }

    function handleReviewClick() {
        setShowReviewForm(!showReviewForm)
    }

    return (
    <>
        <button type='submit' onClick={handleReviewClick}>
            {showReviewForm? 'Hide Review Form' : 'Add Review'}
        </button>
        {showReviewForm ? <form onSubmit={ formik.handleSubmit }>
            <FormField >
                <br></br>
                <Label>Rating:</Label>
                <Input 
                    id='rating'
                    type='text'
                    value={formik.values.rating}
                    onChange={ formik.handleChange }>
                </Input>
                { displayErrors(formik.errors.rating) }
            </FormField>
            <FormField >
                <Label>Comment:</Label>
                <Input 
                    id='comment'
                    type='text'
                    value={formik.values.comment}
                    onChange={ formik.handleChange }>
                </Input>
                { displayErrors(formik.errors.comment) }
            </FormField>
            <FormField>
                <Button type='submit'>Submit</Button>
            </FormField>
            <FormField>
                {errors.map((err)=>(
                    <Error key={err}>{err}</Error>
                ))}
            </FormField>
        </form> : null}
    </>
    )
}

export default ReviewForm;
