import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';

import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Home Page</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello Juliette! I love you!
        </p>
        <Link to="/bondcalculator">
          <Button variant="primary">Go to Calculator</Button>
        </Link>
      </header>
    </div>
  );
}

export default Home;
