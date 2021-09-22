import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import './styles/styles.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider } from './Auth';
import  PrivateRoute  from './PrivateRoute';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  // <React.StrictMode>
  <AuthProvider>
  <Router>
    <div>
      <PrivateRoute path="/" component={App} exact='true'/>
      <Route path="login" component={Login} />
    </div>
  </Router>
  </AuthProvider>
  // </React.StrictMode>
  ,document.getElementById('root')
);

reportWebVitals();
