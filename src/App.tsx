import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { makeServer } from "./services/api";
import { ArticleProvider } from "./context/ArticleContext";
import { ThemeProvider } from "./context/ThemeContext";

import Home from "./pages/Home";

import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    makeServer();
  }, []);

  return (
    <ArticleProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ArticleProvider>
  );
}

export default App;
