import{ BrowserRouter, Routes, Route, Link} from "react-router-dom"
import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Crop from './components/Crop'
import About from './components/About'

import './Styles.css';

function App() {

  return (
    <div className='maindiv'>
      <Navbar />
      <Home />
      <Crop />
      <About />
    </div>
  )
}

export default App
