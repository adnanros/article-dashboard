import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { makeServer } from "./services/api";
import { ArticleProvider } from "./context/ArticleContext";
import Home from "./pages/Home";

import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    makeServer();
  }, []);

  return (
    <ArticleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ArticleProvider>
  );
}

export default App;
