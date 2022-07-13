import React, { useState } from 'react';
import Modal from './Modal.js';
import TriggerButton from './TriggerButton.js';
import TriggerText from './TriggerText.js';
import MealPlanSpace from './MealPlanSpaces.js';

const Container = ({ triggerText, id, retrieveItems, day, time, category }) => {
    const [isShown, setIsShown] = useState(false);
    const foodId = id ? id : null;

    const showModal = () => {
        setIsShown(true);
    }

    const closeModal = () => {
        setIsShown(false);
        retrieveItems();
    }

    if (triggerText === 'Add to Pantry') {
        return (
            <>
                <TriggerText
                    triggerText={triggerText}
                    showModal={showModal}
                />
                {isShown ? (
                    <Modal
                        closeModal={closeModal}
                        id={foodId}
                        triggerText={triggerText}
                    />
                ) : null}
            </>
        )
    } else if (category === 'Meal Plan') {
        return (
            <>
                <MealPlanSpace
                    triggerText={triggerText}
                    showModal={showModal}
                />
                {isShown ? (
                    <Modal
                        closeModal={closeModal}
                        triggerText={triggerText}
                        day={day}
                        time={time}
                        category={category}
                    />
                ) : null}
            </>
        )
    } else {
        return (
            <>
                <TriggerButton
                    triggerText={triggerText}
                    showModal={showModal}
                />
                {isShown ? (
                    <Modal
                        closeModal={closeModal}
                        id={foodId}
                        triggerText={triggerText}
                    />
                ) : null}
            </>
        )
    }
}

export default Container;