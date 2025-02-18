import React from 'react';
import './App.css';
import Navbar from './Layouts/NavbarAndFooter/Navbar';
import { ExploreTopBooks } from './Layouts/HomePage/ExploreTopBooks';
import Carousel from './Layouts/HomePage/Carousel';
import Hero from './Layouts/HomePage/Hero';

function App() {
  return (
    <div>
      <Navbar />
      <ExploreTopBooks />
      <Carousel />
      <Hero />
    </div>
  );
}

export default App;
