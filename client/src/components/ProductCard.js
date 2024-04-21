import React, { useState } from 'react'
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm'
import { Button, Label, Divider } from '../styles';

function ProductCard({ product }) {
    const { id, name, description, price } = product
    
    const [showReviews, setShowReviews] = useState(false)
    const [noReviews, setNoReviews] = useState(false)
    const [reviews, setReviews] = useState(product.reviews)


    const reviewList = reviews.map(review => {
        return <ReviewCard key={review.id} 
            review={review} 
            showReviews={showReviews}  
            setReviews={setReviews}
            reviews={reviews}/>
    })

    function handleClick() {
        setShowReviews(!showReviews)
        setNoReviews(!showReviews && reviews.length === 0);
    }
    

    return (
        <>
            <article>
                <Label>Product Name:</Label>
                <p>{name}</p>
                <h4>Description:</h4>
                <p>{description}</p>
                <h4>Price:</h4>
                <p>{price}</p>
                <Label>Reviews:</Label>
                <Button onClick={handleClick}>
                {showReviews ? 'Hide Reviews' : 'Show Reviews'}
                </Button>
                <ul>
                    {noReviews? <p>No Reviews</p> : reviewList}
                </ul>
                <ReviewForm product={ product } reviews={reviews} setReviews={setReviews} />
            </article>
        </>
    )
}

export default ProductCard;

