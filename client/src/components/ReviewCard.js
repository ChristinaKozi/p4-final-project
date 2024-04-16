import React from 'react'

function ReviewCard({ review, showReviews, noReviews }) {
    const {user, rating, comment} = review

    return (
        <>
        {showReviews? 
        <li>
            <p>User: {user.username}</p>
            <p>Rating: {rating}</p>
            <p>Comment: {comment}</p>
        </li>  : noReviews? "No Reviews" :null}
        </>
    )
}

export default ReviewCard;