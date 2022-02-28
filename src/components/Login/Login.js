import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

export const Login = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userLoggedIn")) {
      navigate("/dashboard");
    }
  }, []);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  const loginFormValues = (e) => {
    setLoginForm((currentState) => {
      return { ...currentState, [e.target.name]: e.target.value };
    });
  };

  const loginFormClearValues = () => {
    setLoginForm({ email: "", password: "" });
  };

  const loginFormSubmitHandler = (e) => {
    e.preventDefault();
    let isEmpty = false;
    for (let key in loginForm) {
      // To check if the input is empty
      if (loginForm[key].trim() === "") {
        isEmpty = true;
        setError("Email or password is not correct");
      }
    }

    if (isEmpty) {
      return;
    } else {
      let formData = new FormData();
      formData.append("email", loginForm.email);
      formData.append("password", loginForm.password);
      axios({
        url: "http://localhost/project9/php/users.php",
        method: "POST",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((res) => {
          props.setUserLoggedIn(true);
          let obj = {
            user_email: res.data.user_email,
            user_name: res.data.user_name,
            user_image: res.data.user_image,
            user_id: +res.data.user_id,
          };
          localStorage.setItem("userLoggedIn", JSON.stringify(obj));
          loginFormClearValues();
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err.message);
          setError("Email or password is not correct");
        });
    }
  };

  return (
    <div className="login-container">
      <form className="ui form login-form">
        <h2>Login</h2>
        <div className="field">
          <label>Email</label>
          <input
            onInput={loginFormValues}
            type="text"
            value={loginForm.email}
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            onInput={loginFormValues}
            type="password"
            value={loginForm.password}
            name="password"
            placeholder="Password"
          />
        </div>
        <div className={`${error ? "show" : ""} login-error`}>
          Email or password is not correct
        </div>
        <button
          onClick={loginFormSubmitHandler}
          className="ui button login-button"
        >
          Login
        </button>
      </form>
    </div>
  );
};
