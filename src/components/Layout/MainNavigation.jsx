import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <NavLink to="/" className={classes.logo}>
        React Auth
      </NavLink>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/auth"
              className={({ isActive }) => (isActive ? classes.active : undefined)}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? classes.active : undefined)}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
