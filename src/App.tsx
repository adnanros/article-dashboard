import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { makeServer } from "./services/api";
import { ArticleProvider } from "./context/ArticleContext";
import { ThemeProvider } from "./context/ThemeContext";

import Home from "./pages/Home";

import logo from "./logo.svg";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
  useEffect(() => {
    makeServer();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <ArticleProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </ArticleProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
