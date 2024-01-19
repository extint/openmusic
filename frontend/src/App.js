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
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from './HomePage/Navbar/Navbar';
import { Desktop } from './signup_login/signup';
import { Desktop1 } from './signup_login/login';
import { Homepage } from './HomePage/Homepage';
import { User } from './Other/User/User';
import { Artist } from './Other/Artist/Artist';
import { Playlist } from './Other/Playlist/Playlist';
import { Song } from './Other/Song/Song';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Desktop1 />} />
          <Route path="/signup" element={<Desktop />} />
          <Route path="/home:userName" element={
            <div className="Main">
              <Homepage />
              <Navbar />
            </div>
            }/>
            <Route path='/song:songName' element={<Song/>}></Route> 
            <Route path='/user:userName' element={<User/>}></Route> 
            <Route path='/song:songName' element={<Song/>}></Route> 
            <Route path='/playlist:playlistName' element={<Playlist/>}></Route> 
            <Route path='/artist:artistName' element={<Artist/>}></Route> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;