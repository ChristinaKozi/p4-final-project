import React, { useEffect, useState } from 'react'
import { Button, Input, Label, Textarea, FormField } from '../styles';
import { useContext } from 'react';
import { UserContext } from '../contents/UserContext';
import { headers } from '../Globals';
import * as yup from 'yup'
import { useFormik } from "formik";

function ReviewCard({ review, showReviews, setReviews, reviews }) {
    const { rating, comment} = review
    const { user } = useContext(UserContext)

    const [isUserComment, setIsUserComment] = useState(false)
    const [editing, setEditing] = useState(false)

    useEffect(()=>{
        if (user.id === review.user.id) {
            setIsUserComment(true)
        } 
    },[user])

    function handleEdit() {
        setEditing(true)
    }

    function handleCancelEdit() {
        setEditing(false);
    }

    
    function handleDeleteReview() {
        fetch(`/reviews/${review.id}`, { method: "DELETE" }).then((r) => {
            if (r.status == 204) {
                const updatedReviews = reviews.filter((r)=> r.id !== review.id)
                setReviews(updatedReviews)
            } else {
                console.error("Failed to delete review");
            }
        })
        .catch((error) => {
            console.error('Error logging out:', error);
        });
    }   
    
    function handleSubmit(values) {
        console.log(values)
        fetch(`/reviews/${review.id}`, { 
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(values) 
        })
        .then((r) => {
            if (r.status === 202) {
                return r.json()
            }
        })
        .then(()=>{
            const updatedReviews = reviews.map((r) => {
                if (r.id === review.id) {
                    return { ...r, rating: values.rating, comment: values.comment };
                } else {
                    return r;
                }
            });
            setReviews(updatedReviews);
            setEditing(false);
        })
        .catch((error) => {
            console.error("Error updating review:", error);
        });
    }

    const schema = yup.object({
        rating: yup.number().positive().min(0).max(5).required(),
        comment: yup.string().min(3).required()
    })

    const formik = useFormik({
        initialValues: {
            rating: rating,
            comment: comment
        },
        validationSchema: schema,
        onSubmit: handleSubmit
    })

    const displayErrors = (error) => {
        return error ? <p style={{ color: "red" }}>{ error }</p> : null;
    }

    return (
        <>
            {showReviews && (
                <li>
                    <Label>User: {review.user.username}</Label>
                    {editing ? (
                        <> 
                        <form onSubmit={formik.handleSubmit} >
                            <FormField>
                                <Label htmlFor="editedRating">Rating:</Label>
                                <Input
                                    id="rating"
                                    type="number"
                                    value={formik.values.rating}
                                    onChange={ formik.handleChange }
                                />
                                { displayErrors(formik.errors.rating) }
                            </FormField>
                            <FormField >
                                <Label htmlFor="editedComment">Comment:</Label>
                                <Textarea
                                    id="comment"
                                    type="text"
                                    value={formik.values.comment}
                                    onChange={ formik.handleChange }
                                />
                                { displayErrors(formik.errors.comment) }
                            </FormField>
                            <FormField >
                                <Button type='submit' >Save</Button> &nbsp;
                                <Button onClick={handleCancelEdit}>Cancel</Button>
                            </FormField>
                        </form>
                        </>
                    ) : (
                        <>
                            <p>Rating: {rating}</p>
                            <p>Comment: {comment}</p>
                            {isUserComment && (
                                <>
                                    <Button onClick={handleEdit}>Edit Review</Button> &nbsp;
                                    <Button onClick={handleDeleteReview}>Delete Review</Button>
                                </>
                            )}
                        </>
                    )}
                </li>
            )}
        </>
    );
}

export default ReviewCard;