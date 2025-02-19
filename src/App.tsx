import React from "react";
import "./App.css";
import Navbar from "./Layouts/NavbarAndFooter/Navbar";
import Footer from "./Layouts/NavbarAndFooter/Footer";
import HomePage from "./Layouts/HomePage/HomePage";
import SearchBookPage from "./Layouts/SearchBookPage/SearchBookPage";
import { Redirect, Route, Switch } from "react-router-dom";
import BookCheckoutPage from "./Layouts/BookCheckoutPage/BookCheckoutPage";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>

        <Route path="/search">
          <SearchBookPage />
        </Route>
        <Route path="/checkout/:bookId">
          <BookCheckoutPage />
        </Route>
      </Switch>
      </div>

      <Footer />
    </div>
  );
}

export default App;
