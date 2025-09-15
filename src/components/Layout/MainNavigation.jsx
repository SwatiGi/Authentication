import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import { LoginContext } from "../contextApi/Context";

const MainNavigation = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };

  return (
    <header className={classes.header}>
      <NavLink to="/" className={classes.logo}>
        React Auth
      </NavLink>
      <nav>
        <ul>
          {!isLogin && (
            <li>
              <NavLink
                to="/auth"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Login
              </NavLink>
            </li>
          )}

          {isLogin && (
            <>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
