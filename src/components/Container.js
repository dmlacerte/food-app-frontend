import React, { Component, useState } from 'react';
import Modal from './Modal.js';
import TriggerButton from './TriggerButton.js'

const Container = ({triggerText, id, retrieveFoodItems}) => {
    const [isShown, setIsShown] = useState(false);
    const foodId = id ? id : null;

    const showModal = () => {
        setIsShown(true);
    }

    const closeModal = () => {
        setIsShown(false);
        retrieveFoodItems();
    }

    return (
        <>
            <TriggerButton 
                triggerText={triggerText}
                showModal={showModal}
            />
            { isShown ? (
                <Modal 
                 closeModal={closeModal}
                 id={foodId}
                 triggerText={triggerText} 
                />
            ) : null }
        </>
    )
}

export default Container;