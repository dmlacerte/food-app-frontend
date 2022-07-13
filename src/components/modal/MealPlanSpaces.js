import React from 'react';
import styles from '../css/TriggerText.module.css';

const MealPlanSpaces = ({ showModal, triggerText }) => {

    return (
        <>
            <td className={"me-2 " + styles.foodPlanButtons} onClick={showModal}>
                {triggerText}
            </td>
        </>
    )
}

export default MealPlanSpaces;