import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const navigate = useNavigate();

  // Toggle between Login and SignUp
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  // Handle Submit
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    let url;
    if (isLogin) {
      // Login
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARDxt5Lm3M6csGWS9yZONyj74rf0MBs-Y";
    } else {
      //  SignUp
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARDxt5Lm3M6csGWS9yZONyj74rf0MBs-Y";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = "Authentication failed!";

           
            if (data && data.error && data.error.message) {
              switch (data.error.message) {
                case "EMAIL_EXISTS":
                  errorMessage = "This email is already registered!";
                  break;
                case "EMAIL_NOT_FOUND":
                  errorMessage = "Email not found!";
                  break;
                case "INVALID_PASSWORD":
                  errorMessage = "Invalid password!";
                  break;
                case "USER_DISABLED":
                  errorMessage = "This account has been disabled!";
                  break;
                default:
                  errorMessage = data.error.message;
              }
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("Success:", data);

        
        localStorage.setItem("token", data.idToken);

          alert("Authentication successful!");
        //   we are redirect to the home page 
        navigate("/"); 
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? "Login" : "Create Account"}</button>}
          {isLoading && <p>Sending request...</p>}

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

