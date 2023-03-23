import './App.css';
import * as React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import MainRoute from './components/MainRoute';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <MainRoute />
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
