// ============================================================
// src/components/ReviewForm.jsx
// Restaurant review form — adds a new review to Firestore
// ============================================================

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const ReviewForm = ({ onReviewAdded }) => {
  const [restaurantName, setRestaurantName] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ----------------------------------------------------------
  // Validate form fields before submitting
  // ----------------------------------------------------------
  const validate = () => {
    const newErrors = {};
    if (!restaurantName.trim())
      newErrors.restaurantName = "Restaurant name is required.";
    if (!rating || rating < 1 || rating > 5)
      newErrors.rating = "Rating must be between 1 and 5.";
    if (!comment.trim())
      newErrors.comment = "Comment is required.";
    return newErrors;
  };

  // ----------------------------------------------------------
  // Handle form submission — saves review to Firestore using addDoc()
  // ----------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    // Validate fields first
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const reviewsRef = collection(db, "reviews");
      // Use addDoc() to add the review document to the "reviews" collection
      await addDoc(reviewsRef, {
        restaurantName: restaurantName.trim(),
        rating: parseInt(rating),
        comment: comment.trim(),
        createdAt: serverTimestamp(),
      });

      // Clear form fields after successful submission
      setRestaurantName("");
      setRating("");
      setComment("");
      setSuccessMsg("✅ Review submitted successfully!");

      // Notify parent to refresh the review list
      if (onReviewAdded) onReviewAdded();

      // Auto-hide success message after 4 seconds
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      console.error("Error adding review:", err);
      setErrorMsg("❌ Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Star rating UI helper
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        className={`star-btn ${parseInt(rating) >= star ? "active" : ""}`}
        onClick={() => setRating(star.toString())}
        aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
      >
        ★
      </button>
    ));
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2>🍽️ Add a Restaurant Review</h2>
        <p className="section-subtitle">Share your dining experience</p>
      </div>

      <div className="form-card">
        {successMsg && (
          <div className="alert alert-success">{successMsg}</div>
        )}
        {errorMsg && (
          <div className="alert alert-error">{errorMsg}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Restaurant Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="restaurantName">
              Restaurant Name
            </label>
            <input
              id="restaurantName"
              type="text"
              className={`form-input ${errors.restaurantName ? "input-error" : ""}`}
              placeholder="e.g. ABC Restaurant"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
            {errors.restaurantName && (
              <span className="error-text">{errors.restaurantName}</span>
            )}
          </div>

          {/* Rating — Star selector */}
          <div className="form-group">
            <label className="form-label">Rating</label>
            <div className="star-selector">{renderStars()}</div>
            {rating && (
              <span className="rating-label">
                {rating} star{rating > 1 ? "s" : ""}
              </span>
            )}
            {errors.rating && (
              <span className="error-text">{errors.rating}</span>
            )}
          </div>

          {/* Comment */}
          <div className="form-group">
            <label className="form-label" htmlFor="comment">
              Comment
            </label>
            <textarea
              id="comment"
              className={`form-input form-textarea ${errors.comment ? "input-error" : ""}`}
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
            {errors.comment && (
              <span className="error-text">{errors.comment}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
