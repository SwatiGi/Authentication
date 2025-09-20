import { useContext, useRef } from 'react'
import classes from './ProfileForm.module.css';
import { AuthContext } from '../../store/AuthContext'

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyARDxt5Lm3M6csGWS9yZONyj74rf0MBs-Y`, {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,     
        password: enteredNewPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(data => {
            let errorMessage = "Password update failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then(data => {
        console.log("Password updated:", data);
        alert("Password changed successfully!");
      })
      .catch(err => {
        alert(err.message);
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          type='password'
          id='new-password'
          minLength="7"
          ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;

