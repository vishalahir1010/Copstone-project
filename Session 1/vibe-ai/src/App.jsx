import React from "react";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { MusicProvider } from "./context/MusicContext";
import { PlaylistProvider } from "./context/PlaylistContext";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/components.css";
import "./styles/responsive.css";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <MusicProvider>
            <PlaylistProvider>
              <AppRoutes />
            </PlaylistProvider>
          </MusicProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;