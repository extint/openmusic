// // import logo from './logo.svg';
// import { Route, Router,Routes } from 'react-router-dom';
// import './App.css';
// import { Navbar } from './HomePage/Navbar/Navbar';
// import { Desktop } from './signup_login/signup';
// import { Desktop1 } from './signup_login/login';
// import { Homepage } from './HomePage/Homepage';
// function App() {
//   return (
//     <div className="App">
//       <Navbar/>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Desktop1/>}/>
//           <Route path="/signup" element={<Desktop/>}/>
//           {/* <Route path={`/home/${user}`} element={<Homepage/>}/> */}
//           <Route path="/home" element={<Homepage/>}/>

//         </Routes>
//       </Router>

//     </div>
//   );
// }

// export default App;
// import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Navbar } from './HomePage/Navbar/Navbar';
import { Desktop } from './signup_login/signup';
import { Desktop1 } from './signup_login/login';
import { Homepage } from './HomePage/Homepage';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Desktop1/>}/>
          <Route path="/signup" element={<Desktop/>}/>
          {/* <Route path={`/home/${user}`} element={<Homepage/>}/> */}
          <Route path="/home/:userName" element={<Homepage/>}/>

        </Routes>
      </Router>

    </div>
  );
}

export default App;