import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './header';
import Landing from './landing-page';
import Games from './games';
import Events from './events';
import './app.css';


export default function App(props) {
    return (
      <Router>
        <div className="app">
          <Header />
          <main>
            <Route exact path="/" component={Landing} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/games" component={Games} />
          </main>
        </div>
      </Router>
    );
}