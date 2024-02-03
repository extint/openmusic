import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from './HomePage/Navbar/Navbar';
import { Desktop } from './signup_login/signup';
import { Desktop1 } from './signup_login/login';
import { Homepage } from './HomePage/Homepage';
import { User } from './Other/User/User';
import { Artist } from './Other/Artist/Artist';
import { Song } from './Other/Song/Song';
// import Playlist from './Other/Playlist/Playlist';
import { Playlistdisplay } from './Other/Playlist/Playlistdisplay/Plalistdisplay';
import { Player } from './HomePage/Player/player';
import { Sidebar } from './HomePage/Sidebar/Sidebar';
function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Desktop1 />} />
            <Route path="/signup" element={<Desktop />} />
          </Routes>
          <>
            <Sidebar />
            <Routes>
              <Route path="/home/:userName" element={
                <div className="Main">
                  <Homepage />
                </div>
              } />
              <Route path='/song/:songName' element={<Song />}></Route>
              <Route path='/user/:userName' element={<User />}></Route>
              <Route path='/playlist' element={<Playlistdisplay />}></Route>
              <Route path='/artist/:artistName' element={<Artist />}></Route>
              </Routes>
              <Player />
            <Navbar />
          </>
        </div>
      </Router >
    </>
  );
}

export default App;
