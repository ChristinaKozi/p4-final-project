import React, { useEffect, useState } from 'react'
import { Button } from '../styles';
import { useContext } from 'react';
import { UserContext } from '../contents/UserContext';

function ReviewCard({ review, showReviews, setReviews, reviews, onUpdate }) {
    const { rating, comment} = review
    const { user } = useContext(UserContext)

    const [isUserComment, setIsUserComment] = useState(false)

    useEffect(()=>{
        if (user.id === review.user.id) {
            setIsUserComment(true)
        } else {
            setIsUserComment(false)
        }
    },[user])

    function handleDeleteReview() {
        // console.log('deleted')
        // console.log(review.id)
        fetch(`/reviews/${review.id}`, { method: "DELETE" }).then((r) => {
            if (r.status == 204) {
                console.log('out');
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

    return (
        <>
        {showReviews ? 
        <li>
            <p>User: {review.user.username}</p>
            <p>Rating: {rating}</p>
            <p>Comment: {comment}</p>
            {isUserComment && <button onClick={onUpdate}>Edit Review</button>}
            {isUserComment && <br></br>}
            {isUserComment && <br></br>}
            {isUserComment && <button onClick={handleDeleteReview}>Delete Review</button>}
        </li>  
        : null}
        </>
    )
}

export default ReviewCard;