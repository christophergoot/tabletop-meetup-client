import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './header';
import Landing from './landing-page';
import Games from './games';
import Events from './events';
import SingleEvent from './single-event';
import NewEvent from './new-event';
import Footer from './footer';
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
            <Route exact path="/events/new" component={NewEvent} />
            <Route exact path="/event/:eventId" component={SingleEvent} />
          </main>
          <Footer />
        </div>
      </Router>
    );
}