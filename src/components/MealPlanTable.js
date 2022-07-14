import React from 'react';
import Container from "./modal/Container";
import styles from "./css/MyMealPlan.module.css";

const MealPlanTable = ({ mealPlanItems, potentialDates, retrieveMealPlanItems }) => {
    return (
        <table className={"table " + styles.tableWeekly}>
            <thead>
                <tr>
                    <th scope="col"></th>
                    {potentialDates.map(date => (
                        <th className={"text-center " + styles.tableHeader} scope="col">{date}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr className={styles.tableRows}>
                    <th scope="row">Breakfast</th>
                    {potentialDates.map(date => {
                        let dailyPlan = mealPlanItems ? mealPlanItems.filter(item => item.day === date && item.time === "Breakfast") : null
                        return (<Container
                            triggerText={dailyPlan && dailyPlan.length > 0 ? dailyPlan[0].description : ""}
                            category="Meal Plan"
                            day={date}
                            time="Breakfast"
                            retrieveItems={retrieveMealPlanItems}
                        />)
                    })}
                </tr>
                <tr className={styles.tableRows}>
                    <th scope="row">Lunch</th>
                    {potentialDates.map(date => {
                        let dailyPlan = mealPlanItems ? mealPlanItems.filter(item => item.day === date && item.time === "Lunch") : null
                        return (<Container
                            triggerText={dailyPlan && dailyPlan.length > 0 ? dailyPlan[0].description : ""}
                            category="Meal Plan"
                            day={date}
                            time="Lunch"
                            retrieveItems={retrieveMealPlanItems}
                        />)
                    })}
                </tr>
                <tr className={styles.tableRows}>
                    <th scope="row">Dinner</th>
                    {potentialDates.map(date => {
                        let dailyPlan = mealPlanItems ? mealPlanItems.filter(item => item.day === date && item.time === "Dinner") : null
                        return (<Container
                            triggerText={dailyPlan && dailyPlan.length > 0 ? dailyPlan[0].description : ""}
                            category="Meal Plan"
                            day={date}
                            time="Dinner"
                            retrieveItems={retrieveMealPlanItems}
                        />)
                    })}
                </tr>
                <tr className={styles.tableRows}>
                    <th scope="row">Snacks</th>
                    {potentialDates.map(date => {
                        let dailyPlan = mealPlanItems ? mealPlanItems.filter(item => item.day === date && item.time === "Snacks") : null
                        return (<Container
                            triggerText={dailyPlan && dailyPlan.length > 0 ? dailyPlan[0].description : ""}
                            category="Meal Plan"
                            day={date}
                            time="Snacks"
                            retrieveItems={retrieveMealPlanItems}
                        />)
                    })}
                </tr>
            </tbody>
        </table>
    )
}

export default MealPlanTable;