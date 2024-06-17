import React, { useEffect } from "react";

const LightDarkModeToggle = () => {
    useEffect(() => {
        const toggleButton = document.getElementById("light-dark-mode-toggle");

        const toggleLightDarkMode = () => {
            document.body.classList.toggle("light-mode");
        };

        toggleButton.addEventListener("click", toggleLightDarkMode);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            toggleButton.removeEventListener("click", toggleLightDarkMode);
        };
    }, []);

    return (
        <button id="light-dark-mode-toggle">
            Toggle Light/Dark Mode
        </button>
    );
};

export default LightDarkModeToggle;