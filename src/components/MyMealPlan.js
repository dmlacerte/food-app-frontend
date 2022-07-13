import React, { useState, useEffect } from "react";
import styles from "./css/MyMealPlan.module.css";
import FoodManagerDataService from "../services/FoodManagerDataService";
import GroceryManagerDataService from "../services/GroceryManagerDataService";
import MealPlanDataService from "../services/MealPlanDataService";
import Container from "./modal/Container";
import MealPlanTable from "./MealPlanTable";

const MyMealPlan = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [groceryItems, setGroceryItems] = useState([]);
    const [mealPlanItems, setMealPlanItems] = useState([]);
    const [checkedPantryIDs, setCheckedPantryIDs] = useState([]);
    const [checkedGroceryIDs, setCheckedGroceryIDs] = useState([]);
    const [selectedDay, setSelectedDay] = useState(["Monday"]);
    const potentialDates = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
                if (newFoodItems.length > 0) newFoodItems.sort(compareItems);
                setFoodItems(newFoodItems);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveMealPlanItems = () => {
        MealPlanDataService.getAll()
            .then(response => {
                let newMealPlanItems = response.data;
                setMealPlanItems(newMealPlanItems);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveGroceryItems = () => {
        GroceryManagerDataService.getAll()
            .then(response => {
                let newGroceryItems = response.data;
                if (newGroceryItems.length > 0) newGroceryItems.sort(compareItems);
                setGroceryItems(newGroceryItems);
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

    const calcDate = (expDateStr) => {
        const expDate = new Date(expDateStr);
        const expDateTime = expDate.getTime();

        const today = new Date();

        return (Math.floor((expDateTime - today) / (24 * 3600 * 1000)) + 1);
    };

    const updateSelectedDay = (ev) => {
        const newDay = [ev.target.value]
        setSelectedDay(newDay);
    };

    useEffect(() => {
        retrieveFoodItems();
        retrieveGroceryItems();
        retrieveMealPlanItems();
    }, []);

    return (
        <div className="row d-flex">
            <div className={"me-2 " + styles.weeklyFoodContainer}>
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
                                className="list-group-item d-flex justify-content-between"
                                key={index}
                            >
                                <div className="d-flex">
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
                                </div>
                                <div className="d-flex">
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
                        <Container
                            triggerText="Add to Pantry"
                            id={checkedGroceryIDs}
                            retrieveItems={() => {
                                retrieveGroceryItems();
                                retrieveFoodItems();
                            }}
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
                                            <p className="mb-0 text-muted">{foodItem.type} | Days to Exp: {calcDate(foodItem.expDate)}</p>
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
            <div className={styles.weeklyPlanContainer}>
                <h3 className={styles.sectionHeader}>Weekly Meal Planner</h3>
                <div className={"d-flex " + styles.weeklyTableContainer}>
                    <MealPlanTable
                        mealPlanItems={mealPlanItems}
                        potentialDates={potentialDates}
                        retrieveMealPlanItems={retrieveMealPlanItems}
                    />
                </div>
                <div className={styles.dailyTableContainer}>
                    <div className="text-center">
                        <div className={styles.expRangeForm}>
                            <form>
                                <select onChange={updateSelectedDay}>
                                    {potentialDates.map((num, index) => {
                                        return (
                                            <option
                                                value={num}
                                                key={index}
                                                selected={num === selectedDay ? true : false}
                                            >
                                                {num}
                                            </option>
                                        )
                                    })}
                                </select>
                            </form>
                        </div>
                    </div>
                    <MealPlanTable
                        mealPlanItems={mealPlanItems}
                        potentialDates={selectedDay}
                        retrieveMealPlanItems={retrieveMealPlanItems}
                    />
                </div>
            </div>
        </div>
    )
}

export default MyMealPlan;