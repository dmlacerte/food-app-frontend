import React, { useState, useEffect } from "react";
import FoodManagerDataService from "../services/FoodManagerDataService";
import Container from "./modal/Container.js";
import AddToMealPlanButton from "./AddToMealPlanButton";
import styles from "./css/MyFoodList.module.css";
import "../App.css";

const MyFoodList = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [expDateRange, setExpDateRange] = useState(7);
    const [selectedType, setSelectedType] = useState(null);
    const typeOptions = ["Vegetable", "Fruit", "Meat", "Dairy", "Frozen", "Packaged", "Misc"];
    const potentialDates = [1, 2, 3, 4, 5, 6, 7];

    useEffect(() => {
        retrieveFoodItems();
    }, []);

    const onChangeSearchName = e => {
        const newSearchName = e.target.value;
        setSearchName(newSearchName);
    };

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
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveFoodItems();
    };

    const removeAllFoodItems = () => {
        FoodManagerDataService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateDateRange = (ev) => {
        setExpDateRange(ev.target.value);
    };

    const findByName = () => {
        FoodManagerDataService.findByName(searchName)
            .then(response => {
                setFoodItems(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const filterOnType = (ev) => {
        setSelectedType(ev.target.innerText);
    };

    const resetType = () => {
        setSelectedType(null);
    };

    const changeUseThisWeekValue = (index) => {
        const changeID = foodItems[index].id;
        const newValue = !(foodItems[index].useThisWeek);
        let newArray = foodItems.map(element => element.id == changeID ? { ...element, useThisWeek: newValue } : element);
        setFoodItems(newArray);

        FoodManagerDataService.updateUseThisWeek(changeID, newValue)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const calcDate = (expDateStr) => {
        const expDate = new Date(expDateStr);
        const expDateTime = expDate.getTime();

        const today = new Date();

        return (Math.floor((expDateTime - today) / (24 * 3600 * 1000)) + 1);
    };

    return (
        <div className="row d-flex">
            <div className={styles.expFoodContainer}>
                <h3 className={styles.sectionHeader}>Use It or Lose It</h3>
                <div className="text-center">Food expiring within the next
                    <div className={styles.expRangeForm}>
                        <form>
                            <select onChange={updateDateRange}>
                                {potentialDates.map((num, index) => {
                                    return (
                                        <option
                                            value={num}
                                            key={index}
                                            selected={num === expDateRange ? true : false}
                                        >
                                            {num}
                                        </option>
                                    )
                                })}
                            </select>
                        </form>
                    </div>
                    days:
                </div>
                <div className="text-center mb-2 text-muted small">
                    Select ✓ to add to weekly meal plan.
                </div>
                <ul className="list-group">
                    {foodItems &&
                        foodItems.map((foodItem, index) => (
                            calcDate(foodItem.expDate) <= expDateRange ?
                                <li
                                    className="list-group-item d-flex justify-content-between"
                                    key={index}
                                >
                                    <div>
                                        <p className={"mb-0 " + styles.foodName}>{foodItem.name}</p>
                                        <div>
                                            <p className="mb-0 text-muted">{foodItem.type} | Days to Exp: {calcDate(foodItem.expDate)}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <AddToMealPlanButton
                                            index={index}
                                            value={foodItem.useThisWeek}
                                            changeUseThisWeekValue={changeUseThisWeekValue}
                                        />
                                    </div>
                                </li>
                                : null
                        ))}
                </ul>
            </div>
            <div className={"col-md-8 " + styles.pantryContainer}>
                <h3 className={styles.sectionHeader}>My Pantry</h3>
                <div className={styles.typeContainer}>
                    {typeOptions.map((type, index) => {
                        return (
                            <div 
                                key={index} 
                                className={styles.typeOptions + " " + type + " " + (type === selectedType ? styles.selectedType : "")} 
                                onClick={filterOnType}
                            >
                                {type}
                            </div>
                        )
                    })}
                </div>
                <div className={styles.resetTypeContainer}>
                    <p className={styles.resetTypeButton} onClick={resetType}>Reset</p>
                </div>
                <div className={"mb-3 " + styles.pantryOptions}>
                    <div className={styles.searchBar}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by name"
                                value={searchName}
                                onChange={onChangeSearchName}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={findByName}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.pantryButtons}>
                        <Container
                            triggerText="Add"
                            retrieveItems={retrieveFoodItems}
                        />
                        <button className="btn btn-outline-danger ms-2" onClick={removeAllFoodItems}>
                            Remove All
                        </button>
                    </div>
                </div>
                <ul className="list-group">
                    {foodItems &&
                        foodItems.map((foodItem, index) => {
                            return (
                                !selectedType || selectedType === foodItem.type ?
                                    <li
                                        className="list-group-item d-flex justify-content-between"
                                        key={index}
                                    >
                                        <div>
                                            <p className={"mb-0 " + styles.foodName}>{foodItem.name}</p>
                                            <div>
                                                <p className="mb-0 text-muted">{foodItem.type} | Days to Exp: {calcDate(foodItem.expDate)}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <AddToMealPlanButton
                                                index={index}
                                                value={foodItem.useThisWeek}
                                                changeUseThisWeekValue={changeUseThisWeekValue}
                                            />
                                            <Container
                                                triggerText="Update"
                                                id={foodItem.id}
                                                retrieveItems={retrieveFoodItems}
                                            />
                                        </div>
                                    </li>
                                    : null
                            )
                        })}
                </ul>
            </div>
        </div>
    );
};

export default MyFoodList;