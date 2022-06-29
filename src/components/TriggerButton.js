import React from 'react';

const TriggerButton = ({ triggerText, showModal}) => {
    return(
        <>
            <button onClick={showModal} >
                {triggerText}
            </button>
        </>
    )
}

export default TriggerButton;