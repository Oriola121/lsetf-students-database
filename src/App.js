import React from 'react'
import GlobalStyle from './components/GlobalStyle'
import Home from './components/Home/Home'
import Student from './components/Student/Student'
import Sponsor from './components/Sponsors/Sponsor'
import Author from './components/Author/Author'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import 'antd/dist/antd.css';






function App () {
  return (
      <>
      <Router>
        <GlobalStyle/>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/student' element = {<Student/>}/>
        <Route path = '/sponsors' element = {<Sponsor/>}/>
        <Route path = '/authorpage' element = {<Author/>}/>
        </Routes>
        </Router>
      </>
    )
}




export default App