import React, { Component } from "react";

import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <h1>Hello world</h1>
        <Footer />
      </div>
    );
  }
}

export default App;
