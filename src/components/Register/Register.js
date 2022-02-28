import React, { useEffect, useState } from "react";
import "./Register.css";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom";

export const Register = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userLoggedIn")) {
      navigate("/dashboard");
    }
  }, []);

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const registerFormValues = (e) => {
    setRegisterForm((currentState) => {
      return { ...currentState, [e.target.name]: e.target.value };
    });
  };

  const registerFormClearValues = () => {
    setRegisterForm({ email: "", name: "", password: "" });
  };

  const registerFormSubmitHandler = (e) => {
    e.preventDefault();
    let isEmpty = false;
    let regex = {
      email: /^[A-z0-9._-]+@(hotmail|gmail|yahoo).com$/,
      name: /^[A-z \s]{3,}$/,
      password:
        /^(?=.*[A-Z])(?=.*[@$!%*#?&])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
    };

    // Validations
    for (let key in registerForm) {
      // To check if the input is empty
      if (registerForm[key].trim() === "") {
        isEmpty = true;
        setErrors((preState) => {
          return { ...preState, [key]: "1" };
        });
      }
      // To check if the input is not valid
      else if (!regex[key].test(registerForm[key].trim())) {
        isEmpty = true;
        setErrors((preState) => {
          return { ...preState, [key]: "2" };
        });
      }
      // The input is valid
      else {
        setErrors((preState) => {
          return { ...preState, [key]: false };
        });
      }
    }

    if (isEmpty) {
      return;
    } else {
      let obj = {
        user_email: registerForm.email,
        user_name: registerForm.name,
        user_image: faker.image.avatar(),
        user_id: "",
      };
      let formData = new FormData();
      formData.append("email", registerForm.email);
      formData.append("name", registerForm.name);
      formData.append("password", registerForm.password);
      formData.append("image", faker.image.avatar());
      axios({
        url: "http://localhost/project9/php/users.php",
        method: "POST",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((res) => {
          obj.user_id = +res.data;
          props.setUserLoggedIn(true);
          props.setUserInfo(obj);
          localStorage.setItem("userLoggedIn", JSON.stringify(obj));
          registerFormClearValues();
          navigate("/dashboard");
        })
        .catch((err) => {
          setErrors((preState) => {
            return { ...preState, email: "3" };
          });
        });
    }
  };

  return (
    <div className="register-container">
      <form className="ui form register-form">
        <h2>Register</h2>
        <div className="field">
          <label>Full Name</label>
          <input
            onInput={registerFormValues}
            type="text"
            value={registerForm.name}
            name="name"
            placeholder="Full Name"
          />
          <div className={`${errors.name ? "show" : ""} reg-error`}>
            {errors.name === "2"
              ? "The name must be at least 3 characters"
              : "This field is required"}
          </div>{" "}
        </div>
        <div className="field">
          <label>Email</label>
          <input
            onInput={registerFormValues}
            type="text"
            value={registerForm.email}
            name="email"
            placeholder="Email"
          />
          <div className={`${errors.email ? "show" : ""} reg-error`}>
            {errors.email === "3"
              ? "Email is not available"
              : errors.email === "2"
              ? "Email is not valid"
              : "This field is required"}
          </div>{" "}
        </div>
        <div className="field">
          <label>Password</label>
          <input
            onInput={registerFormValues}
            type="password"
            value={registerForm.password}
            name="password"
            placeholder="Password"
          />
          <div className={`${errors.password ? "show" : ""} reg-error`}>
            {errors.password === "2"
              ? "Password must be at least 8 chars and contains special,capital,number"
              : "This field is required"}
          </div>
        </div>
        <button
          onClick={registerFormSubmitHandler}
          className="ui button register-button"
        >
          Register
        </button>
      </form>
    </div>
  );
};
