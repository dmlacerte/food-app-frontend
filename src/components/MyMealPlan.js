import React, { useState, useEffect } from "react";
import styles from "./css/MyMealPlan.module.css";
import FoodManagerDataService from "../services/FoodManagerDataService";

const MyMealPlan = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [checkedPantryIDs, setCheckedPantryIDs] = useState([]);

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

    const addToGroceryList = () => {

    };

    const addToPantryList = () => {

    };

    const updateSelectedIDs = (id) => {
        const newCheckedList = [...checkedPantryIDs];
        const index = newCheckedList.findIndex(x => x === id);

        if (index >= 0) {
            newCheckedList.splice(index, 1);
        } else {
            newCheckedList.push(id);
        }

        setCheckedPantryIDs(newCheckedList);
    }

    const removeFromWeeklyPlan = () => {
        checkedPantryIDs.map(id => {
            FoodManagerDataService.updateUseThisWeek(id, false)
                .then(response => {
                    console.log(response.data);
                    retrieveFoodItems();
                })
                .catch(e => {
                    console.log(e);
                });
        })
        
        setCheckedPantryIDs([]);
    }

    const removeFromPantry = () => {
        checkedPantryIDs.map(id => {
            FoodManagerDataService.remove(id)
                .then(response => {
                    console.log(response.data);
                    retrieveFoodItems();
                })
                .catch(e => {
                    console.log(e);
                });
        })
        
        setCheckedPantryIDs([]);
    }

    useEffect(() => {
        retrieveFoodItems();
    }, []);

    return (
        <div className="row">
            <div className="col-md-4">
                <h3 className={styles.sectionHeader}>Food To Use This Week</h3>
                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-outline-success"
                        type="button"
                        onClick={addToGroceryList}
                    >
                        Add Grocery
                    </button>
                    <button
                        className="btn btn-outline-success ms-2"
                        type="button"
                        onClick={addToPantryList}
                    >
                        Add Pantry
                    </button>
                </div>
                <div className="row border border-secondary mt-3">
                    <h4 className={"pt-2 " + styles.sectionHeader}>Grocery</h4>
                </div>
                <div className="row border border-secondary mt-4">
                    <h4 className={"pt-2 " + styles.sectionHeader}>Pantry</h4>
                    <ul className="list-group p-2">
                        {foodItems && foodItems.map((foodItem, index) => (
                            foodItem.useThisWeek ?
                                <li
                                    className="list-group-item d-flex"
                                    key={index}
                                >
                                    <input 
                                        className="form-check-input align-self-center me-2" 
                                        type="checkbox" 
                                        value="" 
                                        id="flexCheckDefault" 
                                        onClick={() => updateSelectedIDs(foodItem.id)}
                                        checked={checkedPantryIDs.includes(foodItem.id) ? true : false}
                                    >
                                    </input>
                                    <div>
                                        <p className={"mb-0 " + styles.foodName}>{foodItem.name}</p>
                                        <div>
                                            <p className="mb-0 text-muted">{foodItem.type} | Days to Exp: {foodItem.daysToExp}</p>
                                        </div>
                                    </div>
                                </li>
                                : null
                        ))}
                    </ul>
                    <div className={"d-flex justify-content-center " + (checkedPantryIDs.length === 0 ? "d-none" : null)}>
                        <p className={"me-2 " + styles.pantryButtons} onClick={removeFromWeeklyPlan}>Remove From Weekly Plan</p>
                        <p className={styles.pantryButtons} onClick={removeFromPantry}>Remove From Pantry</p>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <h3 className={styles.sectionHeader}>Weekly Meal Planner</h3>
            </div>
        </div>
    )
}

export default MyMealPlan;