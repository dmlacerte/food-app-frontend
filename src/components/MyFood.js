import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import FoodManagerDataService from "../services/FoodManagerDataService";

const MyFood = ({ id, closeModal }) => {
  let navigate = useNavigate();

  const initialFoodState = {
    id: null,
    name: "",
    type: ""
  };

  const [currentFood, setCurrentFood] = useState(initialFoodState);
  const typeOptions = ["Vegetable", "Fruit", "Meat", "Dairy", "Frozen", "Packaged", "Misc"];

  const getFood = foodID => {
    FoodManagerDataService.get(foodID)
      .then(response => {
        setCurrentFood(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getFood(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentFood({ ...currentFood, [name]: value });
  };

  const updateFood = () => {
    FoodManagerDataService.update(currentFood.id, currentFood)
      .then(response => {
        console.log(response.data);
        closeModal();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteFood = () => {
    FoodManagerDataService.remove(currentFood.id)
      .then(response => {
        console.log(response.data);
        navigate("/myfood");
        closeModal();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="edit-form">
      <h4 className="text-center">Edit Food Item</h4>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={currentFood.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type" className="mt-2">Type:</label>
          <select className="form-control" id="type" name="type" required onChange={handleInputChange}>
            {typeOptions.map(option => {
              return (
                <option
                  value={option}
                  selected={currentFood.type === option ? true : false}
                >
                  {option}
                </option>
              )
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="daysToExp" className="mt-2">Days to Expiration:</label>
          <input
            type="number"
            step="1"
            className="form-control"
            id="daysToExp"
            name="daysToExp"
            value={currentFood.daysToExp}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <div className="text-center mt-3">
        <button type="submit" className="btn btn-secondary" onClick={updateFood}>
          Update
        </button>
        <button className="btn btn-danger ms-2" onClick={deleteFood}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyFood;