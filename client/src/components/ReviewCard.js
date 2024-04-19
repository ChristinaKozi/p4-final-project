import React, { useEffect, useState } from 'react'
import { Button } from '../styles';
import { useContext } from 'react';
import { UserContext } from '../contents/UserContext';
import { headers } from '../Globals';

function ReviewCard({ review, showReviews, setReviews, reviews }) {
    const { rating, comment} = review
    const { user } = useContext(UserContext)

    const [isUserComment, setIsUserComment] = useState(false)
    const [editing, setEditing] = useState(false)
    const [editedRating, setEditedRating] = useState(rating);
    const [editedComment, setEditedComment] = useState(comment);

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
        setEditedRating(rating);
        setEditedComment(comment)
    }

    function handleUpdateReview() {
        fetch(`/reviews/${review.id}`, { 
            method: "PATCH",
            headers: headers,
        body: JSON.stringify({ rating: editedRating, comment: editedComment }) 
        })
        .then((r) => {
            if (r.status === 202) {
                const updatedReviews = reviews.map((r) => {
                    if (r.id === review.id) {
                        return { ...r, rating: editedRating, comment: editedComment };
                    }
                    return r;
                })
                setReviews(updatedReviews);
                setEditing(false);
            } else {
                console.error("Failed to update review");
            }
        })
        .catch((error) => {
            console.error("Error updating review:", error);
        });
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

    return (
        <>
            {showReviews && (
                <li>
                    <p>User: {review.user.username}</p>
                    {editing ? (
                        <>
                            <label htmlFor="editedRating">Rating:</label>
                            <input
                                type="number"
                                id="editedRating"
                                value={editedRating}
                                onChange={(e) => setEditedRating(e.target.value)}
                            />
                            <br />
                            <label htmlFor="editedComment">Comment:</label>
                            <textarea
                                id="editedComment"
                                value={editedComment}
                                onChange={(e) => setEditedComment(e.target.value)}
                            />
                            <br />
                            <button onClick={handleUpdateReview}>Save</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <p>Rating: {rating}</p>
                            <p>Comment: {comment}</p>
                            {isUserComment && (
                                <>
                                    <button onClick={handleEdit}>Edit Review</button>
                                    <button onClick={handleDeleteReview}>Delete Review</button>
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