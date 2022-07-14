import React from 'react';

const TriggerButton = ({ triggerText, showModal }) => {
    return (
        <>
            <button className={"align-self-center ms-2 " + (triggerText.includes('Add') ? "btn btn-outline-success" : "btn btn-outline-secondary")} onClick={showModal} >
                {triggerText}
            </button>
        </>
    )
}

export default TriggerButton;