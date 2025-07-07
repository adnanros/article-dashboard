import React, { useEffect } from 'react';
import { makeServer } from './services/api';
import { ArticleProvider } from './context/ArticleContext';


import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    makeServer();
  }, []);

  return (
        <ArticleProvider>
          <div className="App">
          </div>
        </ArticleProvider>

  );
}

export default App;
