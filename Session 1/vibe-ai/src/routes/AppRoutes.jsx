import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import { ROUTES } from "../utils/constants";

/*
|--------------------------------------------------------------------------
| Lazy-loaded pages
|--------------------------------------------------------------------------
*/

const Home = lazy(() => import("../pages/Home"));
const Discover = lazy(() => import("../pages/Discover"));
const Search = lazy(() => import("../pages/Search"));

const Playlists = lazy(() => import("../pages/Playlists"));

const CreatePlaylist = lazy(() => import("../pages/CreatePlaylist"));

const PlaylistDetails = lazy(() => import("../pages/PlaylistDetails"));

const SongDetails = lazy(() => import("../pages/SongDetails"));

const LikedSongs = lazy(() => import("../pages/LikedSongs"));

const About = lazy(() => import("../pages/About"));

const Pricing = lazy(() => import("../pages/Pricing"));

const FAQ = lazy(() => import("../pages/FAQ"));

const Contact = lazy(() => import("../pages/Contact"));

const Login = lazy(() => import("../pages/Login"));

const Register = lazy(() => import("../pages/Register"));

const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));

const Profile = lazy(() => import("../pages/Profile"));

const Settings = lazy(() => import("../pages/Settings"));

const Notifications = lazy(() => import("../pages/Notifications"));

const NotFound = lazy(() => import("../pages/NotFound"));

/*
|--------------------------------------------------------------------------
| Page Loader
|--------------------------------------------------------------------------
*/

const PageLoader = () => {
  return (
    <div className="page-loader">
      <div className="page-loader-spinner" />

      <p>Loading...</p>
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| App Routes
|--------------------------------------------------------------------------
*/

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* =========================================================
            PUBLIC APPLICATION ROUTES
        ========================================================= */}

        <Route element={<MainLayout />}>
          {/* Home */}

          <Route path={ROUTES.HOME} element={<Home />} />

          {/* Discover */}

          <Route path={ROUTES.DISCOVER} element={<Discover />} />

          {/* Search */}

          <Route path={ROUTES.SEARCH} element={<Search />} />

          {/* =====================================================
              PLAYLIST ROUTES
          ===================================================== */}

          <Route path={ROUTES.PLAYLISTS} element={<Playlists />} />

          <Route path={ROUTES.CREATE_PLAYLIST} element={<CreatePlaylist />} />

          <Route path="/playlists/:playlistId" element={<PlaylistDetails />} />

          {/* =====================================================
              SONG ROUTES
          ===================================================== */}

          <Route path="/songs/:songId" element={<SongDetails />} />

          {/* =====================================================
              INFORMATION PAGES
          ===================================================== */}

          <Route path={ROUTES.ABOUT} element={<About />} />

          <Route path={ROUTES.PRICING} element={<Pricing />} />

          <Route path={ROUTES.FAQ} element={<FAQ />} />

          <Route path={ROUTES.CONTACT} element={<Contact />} />

          {/* =====================================================
              AUTHENTICATION
          ===================================================== */}

          <Route path={ROUTES.LOGIN} element={<Login />} />

          <Route path={ROUTES.REGISTER} element={<Register />} />

          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />

          {/* =====================================================
              PROTECTED USER ROUTES
          ===================================================== */}

          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.PROFILE} element={<Profile />} />

            <Route path={ROUTES.SETTINGS} element={<Settings />} />

            <Route path={ROUTES.NOTIFICATIONS} element={<Notifications />} />

            <Route path={ROUTES.LIKED_SONGS} element={<LikedSongs />} />
          </Route>

          {/* =====================================================
              404
          ===================================================== */}

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
