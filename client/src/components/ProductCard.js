import React, { useState } from 'react'
import ReviewCard from './ReviewCard'

function ProductCard({ product }) {
    const { id, name, description, price, reviews } = product
    const [showReviews, setShowReviews] = useState(false)
    const [noReviews, setNoReviews] = useState(false)

    const reviewList = reviews.map(review => {
        return <ReviewCard key ={review.id} review={review} showReviews={showReviews} noReviews={noReviews} />
    })

    function handleClick() {
        setShowReviews(!showReviews)
        setNoReviews(!showReviews && reviews.length === 0);
    }

    return (
        <article>
            <h4>Product Name:</h4>
            <p>{name}</p>
            <h4>Description:</h4>
            <p>{description}</p>
            <h4>Price:</h4>
            <p>{price}</p>
            <h4>Reviews:</h4>
            <button onClick={handleClick}>
            {showReviews ? 'Hide Reviews' : 'Show Reviews'}
            </button>
            <ul>
                {noReviews? <p>No Reviews</p> : reviewList}
            </ul>
        </article>
    )
}

export default ProductCard;