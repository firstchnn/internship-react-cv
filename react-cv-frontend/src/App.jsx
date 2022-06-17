import { useState } from 'react'
import logo from './logo.svg'
import { BrowserRouter} from 'react-router-dom'
import './App.css'
import {NavBar} from './components/NavBar'
import  {Footer} from './components/Footer'
import {AnimatedRoutes} from './components/AnimatedRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <AnimatedRoutes/>
      {/* <Footer/> */}
      </BrowserRouter>
    </div>
  )
}

export default App
