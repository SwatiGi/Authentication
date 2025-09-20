import {  Routes, Route ,Navigate} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext } from 'react'
import { AuthContext } from './store/AuthContext'


function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        {!authCtx.isLoggedIn&& <Route path='/auth' element={<AuthPage />} />}
       
        {authCtx.isLoggedIn&&<Route path='/profile' element={<UserProfile/>}/>}
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
    </Layout>
  );
}

export default App;


{/* <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/profile'>
          <UserProfile />
        </Route>
      </Switch> */}

