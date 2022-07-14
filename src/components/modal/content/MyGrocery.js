import React, { useState, useEffect } from "react";
import GroceryManagerDataService from "../../../services/GroceryManagerDataService";

const MyGrocery = ({ id, closeModal }) => {

    const initialGroceryState = {
        id: null,
        name: "",
        type: ""
    };

    const [currentGrocery, setCurrentGrocery] = useState(initialGroceryState);
    const typeOptions = ["Vegetable", "Fruit", "Meat", "Dairy", "Frozen", "Packaged", "Misc"];

    const getGrocery = groceryID => {
        GroceryManagerDataService.get(groceryID)
            .then(response => {
                setCurrentGrocery(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getGrocery(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentGrocery({ ...currentGrocery, [name]: value });
    };

    const updateGrocery = () => {
        GroceryManagerDataService.update(currentGrocery.id, currentGrocery)
            .then(response => {
                console.log(response.data);
                closeModal();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteGrocery = () => {
        GroceryManagerDataService.remove(currentGrocery.id)
            .then(response => {
                console.log(response.data);
                closeModal();
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="edit-form">
            <h4 className="text-center">Edit Grocery Item</h4>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={currentGrocery.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type" className="mt-2">Type:</label>
                    <select className="form-control" id="type" name="type" required onChange={handleInputChange}>
                        {typeOptions.map((option, index) => {
                            return (
                                <option
                                    value={option}
                                    selected={currentGrocery.type === option ? true : false}
                                    key={index}
                                >
                                    {option}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </form>
            <div className="text-center mt-3">
                <button type="submit" className="btn btn-secondary" onClick={updateGrocery}>
                    Update
                </button>
                <button className="btn btn-danger ms-2" onClick={deleteGrocery}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default MyGrocery;