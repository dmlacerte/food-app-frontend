import React, { useState, useEffect } from 'react';
import styles from "./css/Mission.module.css";

const ScrollButton = () => {

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <button
            onClick={scrollToTop}
            style={{ 
                display: visible ? 'inline' : 'none', 
                position: "fixed",
                width: 60,
                left: '47%',
                bottom: 40,
                height: 30,
                fontSize: '1em',
                zIndex: 1,
                cursor: "pointer",
                fontFamily: 'Oswald',
                backgroundColor: "white",
                borderWidth: 0.5,
            }} 
        >
            To Top
        </button>
    );
}

export default ScrollButton;