import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddFood from "./components/AddFood";
import MyFood from "./components/MyFood";
import MyFoodList from "./components/MyFoodList";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-success">
          <Link to={"/myfood"} className="navbar-brand pageHeader">
            Save Your Food
          </Link>
          <div className="navbar-nav mr-auto">
          </div>
        </nav>

        <div className="container mt-3 pageBody">
            <Routes>
              <Route path="/" element={<MyFoodList />} />
              <Route path="/myfood" element={<MyFoodList />} />
              <Route path="/add" element={<AddFood />} />
              <Route path="/myfood/:id" element={<MyFood />} />
            </Routes>
        </div>
      </div>
    );
  }
}

export default App;
