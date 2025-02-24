import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { BrowserRouter as Router , Routes ,Route } from 'react-router-dom'
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state = {
    progress: 10
  }
  apiKey = import.meta.env.VITE_NEWS_API;
  setProgress = (progress) => {
    this.setState({ progress });
  }
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color="#f11946"
        progress={this.state.progress}
      />
        {/* <News apiKey={this.apiKey} pageSize={6} country="us" category="technology"/> */}
        <Routes>
          <Route path="/" element={<News setProgress={this.setProgress} key="general" apiKey={this.apiKey} pageSize={6} country="us" category="general"/>} />
          <Route path="/business"  element={<News setProgress={this.setProgress} key="business" apiKey={this.apiKey} pageSize={6} country="us" category="business"/>} />
          <Route path="/entertainment"  element={<News setProgress={this.setProgress} key="entertainment" apiKey={this.apiKey} pageSize={6} country="us" category="entertainment"/>} />
          <Route path="/health"  element={<News setProgress={this.setProgress} key="health" apiKey={this.apiKey} pageSize={6} country="us" category="health"/>} />
          <Route path="/science"  element={<News setProgress={this.setProgress} key="science" apiKey={this.apiKey} pageSize={6} country="us" category="science"/>} />
          <Route path="/sports"  element={<News setProgress={this.setProgress} key="sports" apiKey={this.apiKey} pageSize={6} country="us" category="sports"/>} />
          <Route path="/technology"  element={<News setProgress={this.setProgress} key="technology" apiKey={this.apiKey} pageSize={6} country="us" category="technology"/>} />
        </Routes>
        </Router>
      </div>
    )
  }
}

