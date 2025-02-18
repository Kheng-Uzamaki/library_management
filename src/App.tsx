import React from 'react';
import './App.css';
import Navbar from './Layouts/NavbarAndFooter/Navbar';
import Footer from './Layouts/NavbarAndFooter/Footer';
import HomePage from './Layouts/HomePage/HomePage';
import SearchBookPage from './Layouts/SearchBookPage/SearchBookPage';

function App() {
  return (
    <div>
      <Navbar />
      {/* <HomePage />*/}
      <SearchBookPage />
      <Footer/>
    </div>
  );
}

export default App;
