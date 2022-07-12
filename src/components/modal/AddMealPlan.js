import React, { useState } from "react";
import MealPlanDataService from "../../services/MealPlanDataService";

const AddMealPlan = ({ day, time }) => {
  const initialMealPlanState = {
    id: null,
    day: day,
    time: time,
    description: ""
  };

  const [currentMealPlan, setCurrentMealPlan] = useState(null);
  const [mealPlanToSubmit, setMealPlanToSubmit] = useState(initialMealPlanState);
  const [submitted, setSubmitted] = useState(false);
  const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeOptions = ["Breakfast", "Lunch", "Dinner", "Snacks"];

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
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newMealPlan = () => {
    setMealPlanToSubmit(initialMealPlanState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <div className="text-center mt-3">
            <button className="btn btn-success" onClick={newMealPlan}>
              Add Another
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h4 className="text-center">Add New Meal Plan Item</h4>
          <div className="form-group">
            <label htmlFor="day" className="mt-2">Day:</label>
            <select className="form-control" id="day" name="" required onChange={handleInputChange}>
              {dayOptions.map(option => {
                return (
                  <option
                    value={option}
                    selected={option === mealPlanToSubmit.day ? true : false}
                  >
                    {option}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="time" className="mt-2">Time:</label>
            <select className="form-control" id="time" name="time" required onChange={handleInputChange}>
              {timeOptions.map(option => {
                return (
                  <option
                    value={option}
                    selected={option === mealPlanToSubmit.time ? true : false}
                  >
                    {option}
                  </option>
                )
              })}
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
      )}
    </div>
  );
};

export default AddMealPlan;