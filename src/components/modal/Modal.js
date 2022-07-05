import React from 'react';
import FocusTrap from 'focus-trap-react';
import ReactDOM from 'react-dom';
import AddFood from './AddFood';
import MyFood from './MyFood';
import MyGrocery from './MyGrocery';
import AddGrocery from './AddGrocery';
import AddWeeklyFood from './AddWeeklyFood';

const Modal = ({ closeModal, triggerText, id }) => {

    let determineModal = null;
    
    if (triggerText === 'Add' || triggerText === 'Add to Pantry') {
        determineModal = <AddFood id={id}/>;
    } else if (triggerText === 'Update') {
        determineModal = <MyFood id={id} closeModal={closeModal} />;
    } else if (triggerText === 'Edit') {
        determineModal = <MyGrocery id={id} closeModal={closeModal} />;
    } else if (triggerText === 'Add Grocery') {
        determineModal = <AddGrocery />;
    } else if (triggerText === 'Add Pantry') {
        determineModal = <AddWeeklyFood />;
    }


    return ReactDOM.createPortal(
        <FocusTrap>
            <aside
                tag="aside"
                role="dialog"
                tabIndex="-1"
                aria-modal="true"
                className="modal-cover"
            >
                <div className="modal-area">
                    <button
                        aria-label="Close Modal"
                        aria-labelledby="close-modal"
                        className="_modal-close"
                        onClick={closeModal}
                    >
                        <span id="close-modal" className="_hide-visual">
                            Close
                        </span>
                        <svg className="_modal-close-icon" viewBox="0 0 40 40">
                            <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                        </svg>
                    </button>
                    <div className="modal-body">
                        {determineModal}
                    </div>
                </div>
            </aside>
        </FocusTrap>,
        document.body
    )
}

export default Modal; 