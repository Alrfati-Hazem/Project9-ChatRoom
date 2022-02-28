import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export default function ModalPopup(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [textAreaPost, setTextAreaPost] = useState("");

  const userName = localStorage.getItem("userLoggedIn")
    ? JSON.parse(localStorage.getItem("userLoggedIn")).user_name.split(" ")[0]
    : "";

  const PostHandel = () => {
    if (textAreaPost.trim() === "") {
      alert("Please fill in input");
    } else {
      let formData = new FormData();
      formData.append("post_content", textAreaPost);
      formData.append("user_id", +props.userInfo.user_id);
      axios({
        url: "http://localhost/project9/php/posts.php",
        method: "POST",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((res) => {
          let obj = res.data;
          props.setNewPost(obj);
        })
        .catch((err) => {
          console.log(err);
        });
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create post</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "100%" }}>
          <div className="ui form">
            <div className="field">
              <label></label>
              <textarea
                onInput={(e) => {
                  setTextAreaPost(e.target.value);
                }}
                placeholder={`What's in your mind, ${userName}?`}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ minWidth: "80px", fontSize: "16px" }}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            style={{ minWidth: "80px", fontSize: "16px" }}
            variant="primary"
            onClick={PostHandel}
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
      <Button variant="primary" onClick={handleShow}>
        {`What's in your mind, ${userName}?`}
      </Button>
    </>
  );
}
