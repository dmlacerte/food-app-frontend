import React, { useState, useEffect } from "react";
import FoodManagerDataService from "../../services/FoodManagerDataService";

const AddWeeklyFood = () => {
    
    const [food, setFood] = useState("");
    const [foodOptions, setFoodOptions] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const compareItems = (a, b) => {
        const itemA = a.name.toUpperCase();
        const itemB = b.name.toUpperCase();
    
        let compare = 0;
        if (itemA > itemB) {
          compare = 1;
        } else if (itemA < itemB) {
          compare = -1;
        }
    
        return compare;
    };

    const retrieveFoodItems = () => {
        FoodManagerDataService.getAll()
            .then(response => {
                let newFoodItems = response.data.filter(x => !x.useThisWeek);
                console.log(newFoodItems);
                newFoodItems.sort(compareItems);
                setFoodOptions(newFoodItems);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleInputChange = ev => {
        const name = ev.target.value;
        setFood(name);
    };

    const changeUseThisWeekValue = () => {
        const index = foodOptions.findIndex(x => x.name === food);
        const changeID = foodOptions[index].id;
        console.log(changeID);

        FoodManagerDataService.updateUseThisWeek(changeID, true)
            .then(response => {
                console.log(response.data);
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newFood = () => {
        setFood("");
        setSubmitted(false);
    };

    useEffect(() => {
        retrieveFoodItems();
    }, []);

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <div className="text-center mt-3">
                        <button className="btn btn-success" onClick={newFood}>
                            Add Another
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <h4 className="text-center">Add New Food Item</h4>
                    <div className="form-group">
                        <label htmlFor="name" className="mt-2">Name:</label>
                        <select className="form-control" id="name" name="name" required onChange={handleInputChange}>
                            {foodOptions.map(option => {
                                return (
                                    <option value={option.name}>
                                        {option.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="text-center mt-3">
                        <button onClick={changeUseThisWeekValue} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddWeeklyFood;