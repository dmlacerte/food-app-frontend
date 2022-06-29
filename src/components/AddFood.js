import React, { useState } from "react";
import FoodManagerDataService from "../services/FoodManagerDataService";

const AddFood = () => {
  const initialFoodState = {
    id: null,
    name: "",
    type: "",
    daysToExp: 0,
  };

  const [food, setFood] = useState(initialFoodState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = ev => {
    const { name, value } = ev.target;
    setFood({ ...food, [name]: value });
  };

  const saveFood = () => {
    let data = {
      name: food.name,
      type: food.type,
      daysToExp: food.daysToExp
    };

    FoodManagerDataService.create(data)
      .then(response => {
        setFood({
          id: response.data.id,
          name: response.data.name,
          type: response.data.type,
          daysToExp: response.data.daysToExp
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newFood = () => {
    setFood(initialFoodState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newFood}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={food.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type</label>
            <input
              type="text"
              className="form-control"
              id="type"
              required
              value={food.type}
              onChange={handleInputChange}
              name="type"
            />
          </div>

          <div className="form-group">
              <label htmlFor="daysToExp">Days to Expiration:</label>
              <input
                type="number"
                step="1"
                className="form-control"
                id="daysToExp"
                required
                value={food.daysToExp}
                onChange={handleInputChange}
                name="daysToExp"
              />
            </div>

          <button onClick={saveFood} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddFood;