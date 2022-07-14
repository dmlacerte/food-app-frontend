import React, { useState, useEffect } from "react";
import MealPlanDataService from "../../../services/MealPlanDataService";

const MyPlan = ({ day, time, closeModal }) => {

    const initialMealPlanState = {
        id: null,
        day: day,
        time: time,
        description: ""
    };

    const [selectedMealPlan, setSelectedMealPlan] = useState(initialMealPlanState);

    const retrieveMealPlan = () => {
        MealPlanDataService.get(day, time)
            .then(response => {
                response ? setSelectedMealPlan(response.data) : setSelectedMealPlan(null);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setSelectedMealPlan({ ...selectedMealPlan, [name]: value });
    };

    const updateMealPlan = () => {
        MealPlanDataService.update(selectedMealPlan.id, selectedMealPlan)
            .then(response => {
                console.log(response.data);
                closeModal();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteMealPlan = () => {
        MealPlanDataService.remove(selectedMealPlan.id)
            .then(response => {
                console.log(response.data);
                closeModal();
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveMealPlan();
    }, []);

    return (
        <div className="edit-form">
            <h4 className="text-center">Edit Meal Plan Item</h4>
            <form>
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
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={selectedMealPlan.description}
                        onChange={handleInputChange}
                    />
                </div>
            </form>
            <div className="text-center mt-3">
                <button type="submit" className="btn btn-secondary" onClick={updateMealPlan}>
                    Update
                </button>
                <button className="btn btn-danger ms-2" onClick={deleteMealPlan}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default MyPlan;