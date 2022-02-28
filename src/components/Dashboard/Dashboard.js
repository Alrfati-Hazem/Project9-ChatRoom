import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import ModalPopup from "../Modal/ModalPopup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CardPost } from "../Card/CardPost";

export const Dashboard = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userLoggedIn")) {
      navigate("/login");
    } else {
      props.setUserInfo(JSON.parse(localStorage.getItem("userLoggedIn")));
    }
  }, []);

  const [posts, setPosts] = useState([]);

  const [newPost, setNewPost] = useState({});

  useEffect(() => {
    axios({
      url: "http://localhost/project9/php/posts.php",
      method: "GET",
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newPost]);

  return (
    <>
      <div className="dashboard">
        <div className="ui form">
          <form className="ui form dashboard-form">
            <div className="dashboard-box">
              <img src={props.userInfo.user_image} alt="avatar" />
              <ModalPopup userInfo={props.userInfo} setNewPost={setNewPost} />
            </div>
          </form>
        </div>
        <div className="posts">
          {posts.length > 0
            ? posts.map((post, index) => {
                return (
                  <CardPost
                    deleteIcon={
                      +props.userInfo.user_id === +post.user_id ? true : false
                    }
                    setNewPost={setNewPost}
                    user_id={props.userInfo.user_id}
                    user_post_id={post.user_id}
                    key={index}
                    id={post.post_id}
                    name={post.user_name}
                    image={post.user_image}
                    content={post.post_content}
                    date={post.post_date}
                  />
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};
