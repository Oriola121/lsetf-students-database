import React from 'react'
import GlobalStyle from './components/GlobalStyle'
import Home from './components/Home/Home'
import StudentDatabase from './components/Student/StudentDatabase'
import Sponsor from './components/Sponsors/Sponsor'
import Author from './components/Author/Author'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App () {
  return (
      <>
      <Router>
        <GlobalStyle/>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/student' element = {<StudentDatabase/>}/>
        <Route path = '/sponsors' element = {<Sponsor/>}/>
        <Route path = '/authorpage' element = {<Author/>}/>
        </Routes>
        </Router>
      </>
    )
}




export default App