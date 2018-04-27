import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './header';
import Nav from './nav';
import Landing from './landing-page';
import './app.css';


export default function App(props) {
    return (
      <Router>
        <div className="App">
          <Header />
          <Nav />
          <main>
            <Route exact path="/" component={Landing} />
          </main>
        </div>
      </Router>
    );
}