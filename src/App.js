import React from 'react';
import GlobalStyle from './GlobalStyle';
import DataView from './Student/data-view';

function App() {
  return (
    <>
      <GlobalStyle />
      <DataView />
    </>
  );
}

export default App;



// import React from 'react'
// import GlobalStyle from './GlobalStyle'
// import DataView from './Student/data-view'
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


// function App () {
//   return (
//       <>
//       <Router>
//         <GlobalStyle/>
//       <Routes>
//         <Route path = '/' element = {<DataView/>}/>
//         </Routes>
//         </Router>
//       </>
//     )
// }




// export default App

