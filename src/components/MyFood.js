import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import FoodManagerDataService from "../services/FoodManagerDataService";

const MyFood = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialFoodState = {
    id: null,
    name: "",
    type: ""
  };

  const [currentFood, setCurrentFood] = useState(initialFoodState);
  const [message, setMessage] = useState("");

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
        setMessage("The food item was updated successfully!");
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
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentFood ? (
        <div className="edit-form">
          <h4>Food Item</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
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
              <label htmlFor="type">Type</label>
              <input
                type="text"
                className="form-control"
                id="type"
                name="type"
                value={currentFood.type}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteFood}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateFood}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Food Item...</p>
        </div>
      )}
    </div>
  );
};

export default MyFood;