import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { MusicProvider } from "./context/MusicContext";
import { MovieProvider } from "./context/MovieContext";
import { RewardsProvider } from "./context/RewardsContext";

import { routes } from "./routes/routeConfig";

import "./App.css";

function AppRoutes() {
  return useRoutes(routes);
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <MusicProvider>
          <MovieProvider>
            <RewardsProvider>
              <AppRoutes />
            </RewardsProvider>
          </MovieProvider>
        </MusicProvider>
      </CartProvider>
    </BrowserRouter>
  );
}