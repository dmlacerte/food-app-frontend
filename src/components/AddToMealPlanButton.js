import React from 'react';

const AddToMealPlanButton = ({ index, value, changeUseThisWeekValue }) => {

    return (
        <>
            <button
                className={value
                    ? "align-self-center btn btn-success" 
                    : "align-self-center btn btn-outline-success"}
                onClick={() => {
                    changeUseThisWeekValue(index);
                }}
                id={index}
            >
                ✓
            </button>
        </>
    )
}

export default AddToMealPlanButton;