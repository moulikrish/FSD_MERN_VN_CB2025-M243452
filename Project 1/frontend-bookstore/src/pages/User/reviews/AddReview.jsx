import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../utils/axiosInstance";

const AddReview = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // 🔥 IMPORTANT LINE

    if (!token) {
      setMessage("You must be logged in to review");
      return;
    }

    try {
      await API.post(
        `/books/${id}/reviews`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔥 SEND TOKEN HERE
          },
        }
      );

      nav(`/book/${id}`);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to submit");
    }
  };

  return (
    <div className="card p-4">
      <h3>Add Review</h3>
      {message && <div className="alert alert-danger">{message}</div>}

      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <select
            className="form-select"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Comment</label>
          <textarea
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddReview;
