import React, { useState, useEffect } from "react";
import styles from "./css/MyMealPlan.module.css";
import FoodManagerDataService from "../services/FoodManagerDataService";
import GroceryManagerDataService from "../services/GroceryManagerDataService";
import Container from "./modal/Container";

const MyMealPlan = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [groceryItems, setGroceryItems] = useState([]);
    const [checkedPantryIDs, setCheckedPantryIDs] = useState([]);
    const [checkedGroceryIDs, setCheckedGroceryIDs] = useState([]);

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
                let newFoodItems = response.data;
                newFoodItems.sort(compareItems);
                setFoodItems(newFoodItems);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveGroceryItems = () => {
        GroceryManagerDataService.getAll()
            .then(response => {
                let newGroceryItems = response.data;
                newGroceryItems.sort(compareItems);
                setGroceryItems(newGroceryItems);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

        setCheckedGroceryIDs([]);
    };

    const updateSelectedPantryIDs = (id) => {
        const newCheckedList = [...checkedPantryIDs];
        const index = newCheckedList.findIndex(x => x === id);

        if (index >= 0) {
            newCheckedList.splice(index, 1);
        } else {
            newCheckedList.push(id);
        }

        setCheckedPantryIDs(newCheckedList);
    };

    const updateSelectedGroceryIDs = (id) => {
        const newCheckedList = [...checkedGroceryIDs];
        const index = newCheckedList.findIndex(x => x === id);

        if (index >= 0) {
            newCheckedList.splice(index, 1);
        } else {
            newCheckedList.push(id);
        }

        setCheckedGroceryIDs(newCheckedList);
    };

    const removeFromGroceryList = () => {
        checkedGroceryIDs.map(id => {
            GroceryManagerDataService.remove(id)
                .then(response => {
                    console.log(response.data);
                    retrieveGroceryItems();
                })
                .catch(e => {
                    console.log(e);
                });
        })

        setCheckedGroceryIDs([]);
    };

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
    };

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
    };

    useEffect(() => {
        retrieveFoodItems();
        retrieveGroceryItems();
    }, []);

    return (
        <div className="row">
            <div className="col-md-4">
                <h3 className={styles.sectionHeader}>Food To Use This Week</h3>
                <div className="d-flex justify-content-center">
                    <Container
                        triggerText="Add Grocery"
                        retrieveItems={retrieveGroceryItems}
                    />
                    <Container
                        triggerText="Add Pantry"
                        retrieveItems={retrieveFoodItems}
                    />
                </div>
                <div className="row border border-secondary mt-4">
                    <h4 className={"pt-2 " + styles.sectionHeader}>Grocery</h4>
                    <ul className="list-group p-2">
                        {groceryItems && groceryItems.map((groceryItem, index) => (
                                <li
                                    className="list-group-item d-flex"
                                    key={index}
                                >
                                    <input
                                        className="form-check-input align-self-center me-2"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                        onClick={() => updateSelectedGroceryIDs(groceryItem.id)}
                                        checked={checkedGroceryIDs.includes(groceryItem.id) ? true : false}
                                    >
                                    </input>
                                    <div>
                                        <p className={"mb-0 " + styles.foodName}>{groceryItem.name}</p>
                                        <div>
                                            <p className="mb-0 text-muted">{groceryItem.type}</p>
                                        </div>
                                    </div>
                                <div>
                                    <Container
                                        triggerText="Edit"
                                        id={groceryItem.id}
                                        retrieveItems={retrieveGroceryItems}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className={"d-flex justify-content-center " + (checkedGroceryIDs.length === 0 ? "d-none" : null)}>
                        {/* <p className={"me-2 " + styles.pantryButtons} onClick={addToPantry}>Add to Pantry</p> */}
                        <Container
                            triggerText="Add to Pantry"
                            id={checkedGroceryIDs}
                            retrieveItems={retrieveGroceryItems}
                        />
                        <p className={styles.pantryButtons} onClick={removeFromGroceryList}>Remove From Grocery List</p>
                    </div>
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
                                        onClick={() => updateSelectedPantryIDs(foodItem.id)}
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