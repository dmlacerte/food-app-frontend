import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import MyFoodList from "./components/MyFoodList";
import MyMealPlan from "./components/MyMealPlan";
import MissionPage from './components/MissionPage';

import ScrollButton from "./components/ScrollButton";

const App = () => {
    
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-success ps-2">
                <Link to={"/"} className="navbar-brand pageHeader">
                    Save Your Food
                </Link>
                <div className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link to={"/mypantry"} className="nav-link">
                            My Pantry
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/mymealplan"} className="nav-link">
                            Meal Planning
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="mt-3 pageBody">
                <Routes>
                    <Route path="/" element={<MissionPage />} />
                    <Route path="/mypantry" element={<MyFoodList />} />
                    <Route path="/mymealplan" element={<MyMealPlan />} />
                </Routes>
            </div>

            <ScrollButton />
        </div>
    );
}

export default App;
