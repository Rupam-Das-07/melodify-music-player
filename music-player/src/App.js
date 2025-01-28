import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import AudioPlayer from "./components/AudioPlayer";
import Browse from "./pages/Browse";
import Library from "./pages/Library";
import Liked from "./pages/Liked";
import NewReleases from "./pages/NewReleases";
import ShufflePlay from "./pages/ShufflePlay";
import Playlist from "./pages/Playlist";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { PlaylistProvider } from "./context/PlaylistContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { RecentlyPlayedProvider } from "./context/RecentlyPlayedContext";
import { Toaster } from "react-hot-toast";
import "./App.css";
import "./styles/themes.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });
  const [currentSong, setCurrentSong] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isAuthPage, setIsAuthPage] = useState(false);

  const handleSongSelect = (song, playlist = []) => {
    setCurrentSong(song);
    setCurrentPlaylist(playlist);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", !darkMode ? "dark" : "light");
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, []);

  return (
    <Router>
      <PlaylistProvider>
        <FavoritesProvider>
          <RecentlyPlayedProvider>
            <div className={`app ${darkMode ? "dark" : "light"}`}>
              <div className="main-content">
                {!isAuthPage && showSidebar && <Sidebar />}
                <div className="content-area">
                  {!isAuthPage && (
                    <Header 
                      darkMode={darkMode} 
                      toggleDarkMode={toggleDarkMode}
                      toggleSidebar={toggleSidebar}
                      onSongSelect={handleSongSelect}
                    />
                  )}
                  <Routes>
                    <Route path="/" element={<Browse onSongSelect={handleSongSelect} />} />
                    <Route path="/library" element={<Library onSongSelect={handleSongSelect} />} />
                    <Route path="/liked" element={<Liked onSongSelect={handleSongSelect} />} />
                    <Route path="/new-releases" element={<NewReleases onSongSelect={handleSongSelect} />} />
                    <Route path="/shuffle" element={<ShufflePlay onSongSelect={handleSongSelect} />} />
                    <Route path="/playlist/:id" element={<Playlist onSongSelect={handleSongSelect} />} />
                    <Route path="/login" element={<Login setIsAuthPage={setIsAuthPage} />} />
                    <Route path="/signup" element={<Signup setIsAuthPage={setIsAuthPage} />} />
                  </Routes>
                </div>
              </div>
              {currentSong && !isAuthPage && (
                <AudioPlayer
                  song={currentSong}
                  playlist={currentPlaylist}
                  onSongSelect={handleSongSelect}
                  currentSong={currentSong}
                  currentPlaylist={currentPlaylist}
                />
              )}
              <div id="modal-root"></div>
            </div>
            <Toaster
              position="bottom-center"
              toastOptions={{
                duration: 2000,
                style: {
                  background: "var(--background-base)",
                  color: "var(--text-base)",
                  border: "1px solid var(--background-tinted-base)",
                },
              }}
            />
          </RecentlyPlayedProvider>
        </FavoritesProvider>
      </PlaylistProvider>
    </Router>
  );
}

export default App;
