import React from 'react';
import './App.css';
import Navbar from './Layouts/NavbarAndFooter/Navbar';
import { ExploreTopBooks } from './Layouts/HomePage/ExploreTopBooks';
import Carousel from './Layouts/HomePage/Carousel';
import Hero from './Layouts/HomePage/Hero';
import LibraryServices from './Layouts/HomePage/LibraryServices';

function App() {
  return (
    <div>
      <Navbar />
      <ExploreTopBooks />
      <Carousel />
      <Hero />
      <LibraryServices />
    </div>
  );
}

export default App;
