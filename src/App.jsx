import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { BrowserRouter as Router , Routes ,Route } from 'react-router-dom'
import LoadingBar from "react-top-loading-bar";

const App = () => {
  
  const [progress , setProgress] = useState(10);
  const apiKey = import.meta.env.VITE_NEWS_API;
 
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color="#f11946"
        progress={progress}
      />
        {/* <News apiKey={this.apiKey} pageSize={6} country="us" category="technology"/> */}
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} key="general" apiKey={apiKey} pageSize={6} country="us" category="general"/>} />
          <Route path="/business"  element={<News setProgress={setProgress} key="business" apiKey={apiKey} pageSize={6} country="us" category="business"/>} />
          <Route path="/entertainment"  element={<News setProgress={setProgress} key="entertainment" apiKey={apiKey} pageSize={6} country="us" category="entertainment"/>} />
          <Route path="/health"  element={<News setProgress={setProgress} key="health" apiKey={apiKey} pageSize={6} country="us" category="health"/>} />
          <Route path="/science"  element={<News setProgress={setProgress} key="science" apiKey={apiKey} pageSize={6} country="us" category="science"/>} />
          <Route path="/sports"  element={<News setProgress={setProgress} key="sports" apiKey={apiKey} pageSize={6} country="us" category="sports"/>} />
          <Route path="/technology"  element={<News setProgress={setProgress} key="technology" apiKey={apiKey} pageSize={6} country="us" category="technology"/>} />
        </Routes>
        </Router>
      </div>
    )
}
export default App;

