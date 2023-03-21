import './App.css';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRoute from './components/MainRoute';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <MainRoute />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
