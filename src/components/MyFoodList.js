import React, { useState, useEffect } from "react";
import FoodManagerDataService from "../services/FoodManagerDataService";
import Container from "./Container.js";

const MyFoodList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [expDateRange, setExpDateRange] = useState(7);
  const potentialDates = [1, 2, 3, 4, 5, 6, 7];

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

  const updateDateRange = (ev) => {
    setExpDateRange(ev.target.value);
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
        <h4>Use It or Lose It</h4>
        <p>Food expiring within the next 
          <form>
            <select onChange={updateDateRange}>
              {potentialDates.map(num => {
                return (
                  <option 
                    value={num}
                    selected={num === expDateRange ? true : false}
                  >
                    {num}
                  </option>
                )
              })}
            </select>
          </form>
          days
        </p>
        <ul className="list-group">
          {foodItems &&
            foodItems.map((foodItem, index) => (
              foodItem.daysToExp <= expDateRange ?  
                  <li
                    className="list-group-item"
                    key={index}
                  >
                    {foodItem.name}
                    <div>
                      <p>{foodItem.type} | Days to Exp: {foodItem.daysToExp}</p>
                    </div>
                  </li>
                : null
            ))}
        </ul>
      </div>

      <div className="col-md-6">
        <h4>My Pantry</h4>
        <Container triggerText="add" retrieveFoodItems={retrieveFoodItems}/>
        <ul className="list-group">
          {foodItems &&
            foodItems.map((foodItem, index) => (
              <li
                className="list-group-item"
                key={index}
              >
                {foodItem.name}
                <div>
                  <p>{foodItem.type} | Days to Exp: {foodItem.daysToExp}</p>
                </div>
                <Container triggerText="edit" id={foodItem.id} retrieveFoodItems={retrieveFoodItems}/>
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
    </div>
  );
};

export default MyFoodList;