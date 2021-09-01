import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const HomeFunction = lazy(() => import('./pages/Home'));
const Logout = lazy(() => import('./pages/Logout'));
const About = lazy(() => import('./pages/About'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));

function App() {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <Route path='/' exact component={HomeFunction} />
          <Route path="/Login" exact component={Login} />
          <Route path="/Signup" exact component={Signup} />
          <Route path="/Logout" exact component={Logout} />
          <Route path='/About' exact component={About} />
          <Route path='/Forgotpassword' exact component={ForgotPassword} />
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
