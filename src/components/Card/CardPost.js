import React, { useState } from "react";
import "./CardPost.css";
import axios from "axios";
import { Comment } from "../Comment/Comment";
import "../Comment/Comment.css";

export const CardPost = (props) => {
  const deletePostHandler = () => {
    axios({
      url: `http://localhost/project9/php/posts.php/${props.id}`,
      method: "DELETE",
    })
      .then((res) => {
        props.setNewPost({ deleted: "yes" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [comment, setComment] = useState("");
  const [commentsPost, setCommentsPost] = useState([]);
  const [showComment, setShowComment] = useState(false);

  const commentValue = (e) => {
    setComment(e.target.value);
  };

  const addCommentHandler = () => {
    let formData = new FormData();
    formData.append("comment_content", comment);
    formData.append("post_id", +props.id);
    formData.append("user_id", +props.user_id);
    axios({
      url: "http://localhost/project9/php/comments.php",
      method: "POST",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        setCommentsPost((preState) => {
          return [...preState, res.data];
        });
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showCommentsHandler = (event, post_id) => {
    axios({
      url: `http://localhost/project9/php/comments.php/${post_id}`,
      method: "GET",
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        setCommentsPost(res.data);
        setShowComment(!showComment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCommentHandler = (event, comment_id) => {
    axios({
      url: `http://localhost/project9/php/comments.php/${comment_id}`,
      method: "DELETE",
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        let comments = commentsPost.filter((ele) => {
          return +ele.comment_id !== +res.data;
        });
        setCommentsPost([...comments]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editCommentHandler = (event, comment_id, comment_content) => {
    let formData = new FormData();
    formData.append("comment_id", comment_id);
    formData.append("comment_content", comment_content);
    axios({
      url: `http://localhost/project9/php/commentsUpdate.php`,
      method: "POST",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        console.log(res);
        let comments = commentsPost.filter((ele) => {
          return +ele.comment_id !== +res.data.comment_id;
        });
        setCommentsPost([...comments, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="ui cards">
      {props.deleteIcon ? (
        <div className="icons" onClick={deletePostHandler}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      ) : (
        ""
      )}
      <div className="card dashboard-card" style={{ width: "100%" }}>
        <div className="content">
          <img
            className="right floated mini ui image card-image"
            src={props.image}
            alt="avatar"
          />
          <div className="header">{props.name}</div>
          <div className="meta">{props.date}</div>
          <div className="description">{props.content}</div>
        </div>
        <div className="ui form form-comment-input">
          <div className="field comment-input">
            <input
              onChange={commentValue}
              value={comment}
              type="text"
              placeholder="Add a comment"
            />
            <i
              onClick={addCommentHandler}
              className="fa-solid fa-paper-plane"
            ></i>{" "}
          </div>
        </div>
        {showComment ? (
          <div className="ui comments">
            <h3 className="ui dividing header comment-header">Comments</h3>
            {commentsPost.map((comment, index) => {
              return (
                <Comment
                  key={comment.comment_id}
                  comment={comment}
                  deleteComment={
                    +props.user_id === +comment.user_id
                      ? true
                      : +props.user_id === +props.user_post_id
                      ? true
                      : false
                  }
                  editCommentHandler={editCommentHandler}
                  deleteCommentHandler={deleteCommentHandler}
                />
              );
            })}
          </div>
        ) : (
          ""
        )}
        <div>
          <button
            className="comment-btn"
            onClick={(e) => showCommentsHandler(e, +props.id)}
          >
            <i className="fa-solid fa-comments"></i>
            {showComment ? "Hide Comments" : "Show Comments"}
          </button>
        </div>
      </div>
    </div>
  );
};
