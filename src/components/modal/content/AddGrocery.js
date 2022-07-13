import React, { useState } from "react";
import GroceryManagerDataService from "../../../services/GroceryManagerDataService";

const AddGrocery = () => {
  const initialGroceryState = {
    id: null,
    name: "",
    type: "Misc"
  };

  const [grocery, setGrocery] = useState(initialGroceryState);
  const [submitted, setSubmitted] = useState(false);
  const typeOptions = ["Vegetable", "Fruit", "Meat", "Dairy", "Frozen", "Packaged", "Misc"];

  const handleInputChange = ev => {
    const { name, value } = ev.target;
    setGrocery({ ...grocery, [name]: value });
  };

  const saveGrocery = () => {
    let data = {
      name: grocery.name,
      type: grocery.type
    };

    GroceryManagerDataService.create(data)
      .then(response => {
        setGrocery({
          id: response.data.id,
          name: response.data.name,
          type: response.data.type
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newGrocery = () => {
    setGrocery(initialGroceryState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <div className="text-center mt-3">
            <button className="btn btn-success" onClick={newGrocery}>
              Add Another
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h4 className="text-center">Add New Grocery Item</h4>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={grocery.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="type" className="mt-2">Type:</label>
            <select className="form-control" id="type" name="type" required onChange={handleInputChange}>
              {typeOptions.map(option => {
                return (
                  <option
                    value={option}
                    selected={option === "Misc" ? true : false}
                  >
                    {option}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="text-center mt-3">
            <button onClick={saveGrocery} className="btn btn-success">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddGrocery;