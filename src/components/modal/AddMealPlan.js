import React, { useState } from "react";
import MealPlanDataService from "../../services/MealPlanDataService";

const AddMealPlan = ({ day, time, closeModal }) => {

  const initialMealPlanState = {
    id: null,
    day: day,
    time: time,
    description: ""
  };

  const [mealPlanToSubmit, setMealPlanToSubmit] = useState(initialMealPlanState);

  const handleInputChange = ev => {
    const { name, value } = ev.target;
    setMealPlanToSubmit({ ...mealPlanToSubmit, [name]: value });
  };

  const saveMealPlan = () => {
    let data = {
      day: mealPlanToSubmit.day,
      time: mealPlanToSubmit.time,
      description: mealPlanToSubmit.description
    };

    MealPlanDataService.create(data)
      .then(response => {
        setMealPlanToSubmit({
          id: response.data.id,
          name: response.data.name,
          type: response.data.type,
          description: response.data.description
        });
        closeModal();
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="submit-form">
      <div>
        <h4 className="text-center">Add New Meal Plan Item</h4>
        <div className="form-group">
          <label htmlFor="day" className="mt-2">Day:</label>
          <select className="form-control" id="day" name="" required>
            <option value={day}>
              {day}
            </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="time" className="mt-2">Time:</label>
          <select className="form-control" id="time" name="time" required>
            <option value={time}>
              {time}
            </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Description:</label>
          <input
            type="text"
            className="form-control"
            id="description"
            required
            value={mealPlanToSubmit.description}
            onChange={handleInputChange}
            name="description"
          />
        </div>
        <div className="text-center mt-3">
          <button onClick={saveMealPlan} className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMealPlan;