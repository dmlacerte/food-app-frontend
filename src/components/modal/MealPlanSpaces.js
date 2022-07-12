import React, { useState, useEffect } from 'react';
import MealPlanDataService from '../../services/MealPlanDataService';

const MealPlanSpaces = ({ day, time, showModal }) => {

    const [selectedMealPlan, setSelectedMealPlan] = useState(null);

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

    useEffect(() => {
        retrieveMealPlan();
    }, []);

    return (
        <td onClick={() => {
            retrieveMealPlan();
            showModal();
        }}>
            {selectedMealPlan ? selectedMealPlan.description : null}
        </td>
    )
}

export default MealPlanSpaces;