import React from 'react';
import styles from '../css/TriggerText.module.css';

const TriggerText = ({ triggerText, showModal}) => {
    return(
        <>
            <p className={"me-2 " + styles.pantryButtons} onClick={showModal}>
                {triggerText}
            </p>
        </>
    )
}

export default TriggerText;