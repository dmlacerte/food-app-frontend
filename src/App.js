import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddFood from "./components/add-food.component";
import MyFood from "./components/myfood.component";
import MyFoodList from "./components/myfood-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/myfood"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/myfood"} className="nav-link">
                My Food
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
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
