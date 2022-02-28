import React, { useState } from "react";

export const Comment = (props) => {
  const [commentContent, setCommentContent] = useState(
    props.comment.comment_content
  );

  const [showCommentEdit, setShowCommentEdit] = useState(false);

  const cancel = (e) => {
    setShowCommentEdit(false);
    setCommentContent(props.comment.comment_content);
  };

  return (
    <>
      <div className="comment">
        {console.log(props.deleteComment)}
        <span className="avatar">
          <img src={props.comment.user_image} alt="avatar" />
        </span>
        <div className="content">
          <span className="author">{props.comment.user_name}</span>
          <div className="metadata">
            <span className="date">{props.comment.comment_date}</span>
          </div>
          {showCommentEdit ? (
            <div className="ui form form-comment-input-edit">
              <input
                className="comment-input-edit"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />
            </div>
          ) : (
            <div className="text">{props.comment.comment_content}</div>
          )}

          {showCommentEdit ? (
            <div className="actions">
              {props.deleteComment ? (
                <a className="cancel" onClick={cancel}>
                  Cancel
                </a>
              ) : (
                ""
              )}
              {props.deleteComment ? (
                <a
                  className="edit"
                  onClick={(e) => {
                    props.editCommentHandler(
                      e,
                      props.comment.comment_id,
                      commentContent
                    );
                    setShowCommentEdit(false);
                  }}
                >
                  Save
                </a>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="actions">
              {props.deleteComment ? (
                <a
                  className="delete"
                  onClick={(e) =>
                    props.deleteCommentHandler(e, +props.comment.comment_id)
                  }
                >
                  Delete
                </a>
              ) : (
                ""
              )}
              {props.deleteComment ? (
                <a className="edit" onClick={() => setShowCommentEdit(true)}>
                  Edit
                </a>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
