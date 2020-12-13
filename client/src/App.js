import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomeFunction from './pages/Home';
import Logout from './pages/Logout';
import About from './pages/About';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
      <Router>
        <Switch>
          <Route path='/' exact component={HomeFunction}/>
          <Route path="/Login" exact component={Login}/>
          <Route path="/Signup" exact component={Signup}/>
          <Route path="/Logout" exact component={Logout}/>
          <Route path ='/About' exact component={About}/>
          <Route path='/Forgotpassword' exact component={ForgotPassword}/>
        </Switch>
      </Router>
  );
}

export default App;
