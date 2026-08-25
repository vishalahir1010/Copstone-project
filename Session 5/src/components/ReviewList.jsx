// ============================================================
// src/components/ReviewList.jsx
// Displays all restaurant reviews with inline editing support
// ============================================================

import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const ReviewList = forwardRef((_props, ref) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Track which review is currently being edited
  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState("");
  const [editComment, setEditComment] = useState("");
  const [editErrors, setEditErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [editMsg, setEditMsg] = useState({ id: null, type: "", text: "" });

  // ----------------------------------------------------------
  // Fetch all reviews from the "reviews" Firestore collection
  // using async/await and try/catch
  // ----------------------------------------------------------
  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const reviewsRef = collection(db, "reviews");
      // Order by creation time descending, if index exists; fallback to unordered
      let snapshot;
      try {
        const q = query(reviewsRef, orderBy("createdAt", "desc"));
        snapshot = await getDocs(q);
      } catch {
        snapshot = await getDocs(reviewsRef);
      }
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Expose fetchReviews to parent via ref so ReviewForm can trigger a refresh
  useImperativeHandle(ref, () => ({ refresh: fetchReviews }));

  useEffect(() => {
    fetchReviews();
  }, []);

  // ----------------------------------------------------------
  // Open edit mode for a specific review
  // ----------------------------------------------------------
  const startEdit = (review) => {
    setEditingId(review.id);
    setEditRating(review.rating?.toString() || "");
    setEditComment(review.comment || "");
    setEditErrors({});
    setEditMsg({ id: null, type: "", text: "" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditRating("");
    setEditComment("");
    setEditErrors({});
  };

  // ----------------------------------------------------------
  // Save edited review — updates only rating and comment using
  // Firestore updateDoc() — does NOT create a new document
  // ----------------------------------------------------------
  const saveEdit = async (reviewId) => {
    // Validate inline edit fields
    const newErrors = {};
    if (!editRating || editRating < 1 || editRating > 5)
      newErrors.rating = "Rating must be 1–5.";
    if (!editComment.trim()) newErrors.comment = "Comment is required.";

    if (Object.keys(newErrors).length > 0) {
      setEditErrors(newErrors);
      return;
    }

    setSaving(true);
    try {
      const reviewDoc = doc(db, "reviews", reviewId);
      // Use updateDoc() to update only rating and comment fields
      await updateDoc(reviewDoc, {
        rating: parseInt(editRating),
        comment: editComment.trim(),
      });

      // Immediately update UI state — no re-fetch needed
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId
            ? { ...r, rating: parseInt(editRating), comment: editComment.trim() }
            : r
        )
      );

      setEditingId(null);
      setEditMsg({ id: reviewId, type: "success", text: "✅ Review updated!" });
      setTimeout(() => setEditMsg({ id: null, type: "", text: "" }), 3000);
    } catch (err) {
      console.error("Error updating review:", err);
      setEditMsg({
        id: reviewId,
        type: "error",
        text: "❌ Failed to update. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  // Star selector for the edit form
  const renderEditStars = () =>
    [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        className={`star-btn small ${parseInt(editRating) >= star ? "active" : ""}`}
        onClick={() => setEditRating(star.toString())}
      >
        ★
      </button>
    ));

  // Static star display
  const renderStaticStars = (rating) =>
    [1, 2, 3, 4, 5].map((star) => (
      <span key={star} className={`star-display ${rating >= star ? "filled" : ""}`}>
        ★
      </span>
    ));

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="review-list-section">
      <div className="section-header">
        <h2>📋 All Reviews</h2>
        <p className="section-subtitle">{reviews.length} review{reviews.length !== 1 ? "s" : ""} found</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>⚠️</span> {error}
        </div>
      )}

      {reviews.length === 0 && !error && (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No reviews yet</h3>
          <p>Add your first restaurant review above!</p>
        </div>
      )}

      <div className="reviews-grid">
        {reviews.map((review) => (
          <div key={review.id} className="card review-card">
            {/* Inline success/error message for this review */}
            {editMsg.id === review.id && (
              <div className={`alert alert-${editMsg.type}`}>{editMsg.text}</div>
            )}

            {editingId === review.id ? (
              // ---- EDIT MODE ----
              <div className="edit-mode">
                <h3 className="review-restaurant">{review.restaurantName}</h3>
                <p className="edit-label">Editing review</p>

                <div className="form-group">
                  <label className="form-label">New Rating</label>
                  <div className="star-selector">{renderEditStars()}</div>
                  {editErrors.rating && (
                    <span className="error-text">{editErrors.rating}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">New Comment</label>
                  <textarea
                    className={`form-input form-textarea ${editErrors.comment ? "input-error" : ""}`}
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    rows={3}
                  />
                  {editErrors.comment && (
                    <span className="error-text">{editErrors.comment}</span>
                  )}
                </div>

                <div className="edit-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => saveEdit(review.id)}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "💾 Save"}
                  </button>
                  <button className="btn btn-outline" onClick={cancelEdit}>
                    ✕ Cancel
                  </button>
                </div>
              </div>
            ) : (
              // ---- VIEW MODE ----
              <div className="view-mode">
                <div className="review-top">
                  <h3 className="review-restaurant">{review.restaurantName}</h3>
                  <button
                    className="btn btn-edit"
                    onClick={() => startEdit(review)}
                  >
                    ✏️ Edit
                  </button>
                </div>
                <div className="review-stars">
                  {renderStaticStars(review.rating)}
                  <span className="rating-value">({review.rating}/5)</span>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

ReviewList.displayName = "ReviewList";
export default ReviewList;
