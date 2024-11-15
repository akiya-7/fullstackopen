import { useState } from "react";
import { displayAlert } from "../reducers/alertReducer.js";
import { useDispatch, useSelector } from "react-redux";
import { newComment } from "../reducers/blogReducer.js";

const AddComment = ({ blog }) => {
  const [comment, setComment] = useState("");
  const currentUser = useSelector((state) => state.currentUser.user);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(newComment(comment, blog, currentUser));
    } catch (error) {
      console.log(error);
      dispatch(displayAlert(error.response, "error"));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type={"text"}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type={"submit"}>add comment</button>
      </form>
    </>
  );
};

export default AddComment;
