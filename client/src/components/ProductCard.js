import React, { useState } from 'react'
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm'
import styled from "styled-components";

function ProductCard({ product }) {
    const { id, name, description, price } = product
    
    const [showReviews, setShowReviews] = useState(false)
    const [noReviews, setNoReviews] = useState(false)
    const [reviews, setReviews] = useState(product.reviews)

    const reviewList = reviews.map(review => {
        return <ReviewCard key ={review.id} review={review} showReviews={showReviews} noReviews={noReviews} />
    })

    function handleClick() {
        setShowReviews(!showReviews)
        setNoReviews(!showReviews && reviews.length === 0);
    }

    return (
        <>
            <Divider />
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
                <ReviewForm product={ product } reviews={reviews} setReviews={setReviews} />
            </article>
        </>
    )
}

export default ProductCard;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;