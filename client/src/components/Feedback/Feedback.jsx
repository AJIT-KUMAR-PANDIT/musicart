import React, { useEffect, useState } from "react";
import style from "./Feedback.module.css";
import { VscFeedback } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import {
  addFeedbackAsync,
  addToFeedbackSucc,
  clearAddFeedbackSucc,
  userInfoToggle,
} from "../../Redux/User/UserSlice";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

const Feedback = () => {
  const [showFeedbackBox, setShowFeedbackBox] = useState(false);
  const [feedbackType, setFeedbackType] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackTypeError, setFeedbackTypeError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [feedbackError, setFeedbackError] = useState(false);

  const toggle = useSelector(userInfoToggle);
  const addedFeedbackSuccessfully = useSelector(addToFeedbackSucc);
  const dispatch = useDispatch();

  const handleSetFeedbackType = (value) => {
    setFeedbackTypeError(false);
    setFeedbackType(value);
  };

  const handleSetFeedback = (value) => {
    setFeedbackError(false);
    setFeedback(value);
  };

  const handleSubmit = () => {
    if (!feedback && !feedbackType) {
      setFeedbackError(true);
      setFeedbackTypeError(true);
    } else if (!feedback) {
      setFeedbackError(true);
    } else if (!feedbackType) {
      setFeedbackTypeError(true);
    } else {
      setFeedbackError(false);
      setFeedbackTypeError(false);

      const data = {
        feedbackType,
        feedback,
      };
      setLoader(true);
      dispatch(addFeedbackAsync(data));
    }
  };

  const handleResetLoader = () => {
    if (addedFeedbackSuccessfully) {
      dispatch(clearAddFeedbackSucc());
    }
    setLoader(false);
  };

  useEffect(() => {
    if (addedFeedbackSuccessfully && loader) {
      setFeedback("");
      setFeedbackType("");
      toast.success("Feedback sent successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleResetLoader();
    }
  }, [toggle]);

  return (
    <section className={style.feedbackContainer}>
      <div
        className={`${
          showFeedbackBox ? style.feedbackInputBoxOn : style.feedbackInputBoxOff
        }`}
      >
        <div className={style.feedbackSection}>
          <div className={style.feedbackInputUp}>
            <span className={style.type}>Type of feedback</span>
            <select
              value={feedbackType}
              onChange={(e) => handleSetFeedbackType(e.target.value)}
            >
              <option value={""}>Choose the type</option>
              <option value={"Bugs"}>Bugs</option>
              <option value={"Feedback"}>Feedback</option>
              <option value={"Query"}>Query</option>
            </select>
            <span className={style.error}>
              {feedbackTypeError && "*Required Field"}
            </span>
          </div>
          <div className={style.feedbackInputDown}>
            <span className={style.type}>Feedback </span>
            <textarea
              onChange={(e) => handleSetFeedback(e.target.value)}
              placeholder="Type your feedback"
              value={feedback}
            ></textarea>
            <span className={style.error}>
              {feedbackError && "*Required Field"}
            </span>
          </div>
          <div className={style.feedbackSubmitContainer}>
            <button onClick={() => handleSubmit()}>
              {!loader ? "Submit" : <BeatLoader size={10} color="white" />}
            </button>
          </div>
        </div>
      </div>
      <div className={style.feedbackIcon}>
        <span onClick={() => setShowFeedbackBox(!showFeedbackBox)}>
          <VscFeedback />
        </span>
      </div>
    </section>
  );
};

export default Feedback;
