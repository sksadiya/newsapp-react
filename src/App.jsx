import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { BrowserRouter as Router , Routes ,Route } from 'react-router-dom'


export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        {/* <News apiKey="540e4b9ffcc943589eef215452d2650c" pageSize={6} country="us" category="technology"/> */}
        <Routes>
          <Route path="/" element={<News key="general" apiKey="540e4b9ffcc943589eef215452d2650c" pageSize={6} country="us" category="general"/>} />
          <Route path="/business" element={<News key="business" apiKey="540e4b9ffcc943589eef215452d2650c" pageSize={6} country="us" category="business"/>} />
          <Route path="/entertainment" element={<News key="entertainment" apiKey="540e4b9ffcc943589eef215452d2650c" pageSize={6} country="us" category="entertainment"/>} />
          <Route path="/health" element={<News key="health" apiKey="540e4b9ffcc943589eef215452d2650c" pageSize={6} country="us" category="health"/>} />
          <Route path="/science" element={<News key="science" apiKey="540e4b9ffcc943589eef215452d2650c" pageSize={6} country="us" category="science"/>} />
          <Route path="/sports" element={<News key="sports" apiKey="540e4b9ffcc943589eef215452d2650c" pageSize={6} country="us" category="sports"/>} />
          <Route path="/technology" element={<News key="technology" apiKey="540e4b9ffcc943589eef215452d2650c" pageSize={6} country="us" category="technology"/>} />
        </Routes>
        </Router>
      </div>
    )
  }
}

