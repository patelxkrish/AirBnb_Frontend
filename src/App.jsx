import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import List from "./pages/List";
import NewList from "./pages/NewList";
import ListEdit from "./pages/ListEdit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";

function RequireAuth({ children }) {
  const { isLoggedIn, checkingSession } = useAuth();
  if (checkingSession) return null;
  return isLoggedIn ? children : <Navigate to="/Login" replace />;
}

function AppRoutes() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route
            path="/NewList"
            element={
              <RequireAuth>
                <NewList />
              </RequireAuth>
            }
          />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/listing/:id" element={<List />} />
          <Route
            path="/listing/:id/edit"
            element={
              <RequireAuth>
                <ListEdit />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
