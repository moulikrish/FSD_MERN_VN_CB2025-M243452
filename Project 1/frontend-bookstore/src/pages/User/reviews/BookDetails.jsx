import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../../../utils/axiosInstance";
import Loader from "../../../components/Loader";
import { AuthContext } from "../../../context/AuthContext";

const BookDetails = () => {
  const { id } = useParams(); // Make sure your route is /book/:id
  console.log("Book ID:", id);
  const { user } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);

  // Fetch book details
  const loadBook = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.get(`/books/${id}`);
      setBook(data);
    } catch (err) {
      console.error("Error loading book:", err);
      setError(
        err.response?.data?.message || "Failed to load book. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBook();
  }, [id]);

  // Submit review
  const postReview = async (e) => {
    e.preventDefault();
    setMsg(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setMsg("Please login to add a review.");
      return;
    }

    try {
      await API.post(`/books/${id}/reviews`, reviewForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg("Review added successfully!");
      setReviewForm({ rating: 5, comment: "" });
      loadBook(); // Refresh reviews immediately
    } catch (err) {
      console.error("Review submission error:", err);
      setMsg(err.response?.data?.message || "Review submission failed.");
    }
  };

  if (loading) return <Loader />;
  if (error)
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  if (!book) return <div className="text-center mt-10">Book not found</div>;

  return (
    <div className="container my-5">
      <div className="row">
        {/* LEFT: Book Details */}
        <div className="col-lg-8 mb-3">
          <div className="card p-3 shadow-sm">
            <h2>{book.title}</h2>
            <h6 className="text-muted">{book.author}</h6>
            {book.image && (
              <img
                src={`http://localhost:5000/${book.image}`}
                alt={book.title}
                className="img-fluid rounded my-3"
              />
            )}
            <p>{book.description}</p>
            <h5>Price: ₹{book.price}</h5>
            <hr />
            <h4>Reviews ({book.numReviews || 0})</h4>

            {(book.reviews || []).length === 0 ? (
              <p className="text-muted">No reviews yet.</p>
            ) : (
              book.reviews.map((r) => (
                <div key={r._id} className="border rounded p-2 mb-2 bg-light">
                  <strong>{r.user?.name || "Anonymous"}</strong>
                  <div>⭐ Rating: {r.rating}</div>
                  <p>{r.comment}</p>
                </div>
              ))
            )}

            {msg && (
              <div className="alert alert-success mt-3" role="alert">
                {msg}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Add Review */}
        <div className="col-lg-4">
          <div className="card p-3 shadow-sm">
            <h4>Add Review</h4>
            {user ? (
              <form onSubmit={postReview}>
                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <select
                    className="form-select"
                    value={reviewForm.rating}
                    onChange={(e) =>
                      setReviewForm({
                        ...reviewForm,
                        rating: Number(e.target.value),
                      })
                    }
                  >
                    <option value={5}>5 - Excellent</option>
                    <option value={4}>4 - Very Good</option>
                    <option value={3}>3 - Good</option>
                    <option value={2}>2 - Fair</option>
                    <option value={1}>1 - Poor</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Comment</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={reviewForm.comment}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, comment: e.target.value })
                    }
                    required
                  />
                </div>

                <button className="btn btn-primary w-100">Submit Review</button>
              </form>
            ) : (
              <div className="text-muted">Please login to submit a review.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
