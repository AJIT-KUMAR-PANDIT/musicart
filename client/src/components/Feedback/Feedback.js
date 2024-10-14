import React, { useState } from "react";
import axios from "axios";
import style from "./Feedback.module.css";
import { BACKEND_URL } from "../../constants/baseurl";

const Feedback = ({ isOpen, onClose }) => {
  const [feedbackType, setFeedbackType] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackType) {
      setError("*Required Field");
      return;
    }
    if (!feedbackText) {
      setError("*Required Field");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/api/feedback/takefeedback`, {
        type: feedbackType,
        feedback: feedbackText,
      });
      console.log("Feedback submitted successfully!");
      onClose();

      setFeedbackType("");
      setFeedbackText("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={style.feedbackModal}>
      <div className={style.feedbackModalContent}>
        <span className={style.closeButton} onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="feedbackType">Type of feedback</label>
            <select
              id="feedbackType"
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              className={style.feedbackModalSelect}
            >
              <option value="" disabled hidden>Choose the type</option>
              <option value="bug">Bug</option>
              <option value="feedback">Feedback</option>
              <option value="query">Query</option>
            </select>
            {error && <p className={style.error}>{error}</p>}
          </div>
          <div>
            <label htmlFor="feedbackText">Feedback</label>
            <textarea
              id="feedbackText"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className={style.feedbackModalTextarea}
              placeholder="Type your feedback"
            ></textarea>
            {error && <p className={style.error}>{error}</p>}
          </div>
          <button type="submit" className={style.feedbackModalSubmitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
