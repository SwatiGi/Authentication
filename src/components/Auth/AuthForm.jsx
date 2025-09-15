import { useRef, useState } from 'react'; 
import classes from './AuthForm.module.css';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
    
    const passwordInputRef = useRef();
    const emailInputRef = useRef();
    
  const switchAuthModeHandler = () => {
      setIsLogin((prevState) => !prevState);
      console.log(passwordInputRef.current.value)
      console.log(emailInputRef.current.value)
      
    };
  const submitHandler = (event) => {
  event.preventDefault();

  const enteredEmail = emailInputRef.current.value;
  const enteredPassword = passwordInputRef.current.value;

  let url;
setIsLoading(true)
  if (isLogin) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARDxt5Lm3M6csGWS9yZONyj74rf0MBs-Y";
  } else {
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
        setIsLoading(false)
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((data) => {
          let errorMessage = "Authentication failed!";

          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }

          throw new Error(errorMessage);
        });
      }
    })
    .then((data) => {
      console.log("Success: ", data);
      alert("Authentication successful!");
    })
    .catch((err) => {
      alert(err.message); 
    });
};


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {/* ✅ yeh actual submit button hai */}
         {!isLoading&& <button>{isLogin ? 'Login' : 'Create Account'}</button>}
{isLoading&&<h1>Loading...</h1>}
          {/* ✅ yeh toggle button hai */}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
