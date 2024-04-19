import React, { useEffect, useState } from 'react'
import { Button } from '../styles';
import { useContext } from 'react';
import { UserContext } from '../contents/UserContext';

function ReviewCard({ review, showReviews, onDelete, onUpdate }) {
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
            {isUserComment && <button onClick={onDelete}>Delete Review</button>}
        </li>  
        : null}
        </>
    )
}

export default ReviewCard;