import React, { useState, useEffect } from "react";
import FoodManagerDataService from "../services/FoodManagerDataService";
import { Link } from "react-router-dom";

const MyFoodList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [currentFoodItem, setCurrentFoodItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveFoodItems();
  }, []);

  const onChangeSearchName = e => {
    const newSearchName = e.target.value;
    setSearchName(newSearchName);
  };

  const retrieveFoodItems = () => {
    FoodManagerDataService.getAll()
      .then(response => {
        setFoodItems(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveFoodItems();
    setCurrentFoodItem(null);
    setCurrentIndex(-1);
  };

  const setActiveFoodItem = (foodItem, index) => {
    setCurrentFoodItem(foodItem);
    setCurrentIndex(index);
  };

  const removeAllFoodItems = () => {
    FoodManagerDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    FoodManagerDataService.findByName(searchName)
      .then(response => {
        setFoodItems(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Food Items List</h4>

        <ul className="list-group">
          {foodItems &&
            foodItems.map((foodItem, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveFoodItem(foodItem, index)}
                key={index}
              >
                {foodItem.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllFoodItems}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentFoodItem ? (
          <div>
            <h4>Food Item</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentFoodItem.name}
            </div>
            <div>
              <label>
                <strong>Type:</strong>
              </label>{" "}
              {currentFoodItem.type}
            </div>
            <button>
              <Link
                to={"/myfood/" + currentFoodItem.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Food Item...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFoodList;