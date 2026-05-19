// =================================================================
// = common.js
// =  Description   : utility class
// =  Author        : jtpeller
// =  Date          : September 19, 2022
// =================================================================
"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const themeToggles = document.querySelectorAll('#theme-toggle');
    const themeIcons = document.querySelectorAll('#theme-icon');

    const updateThemeIcon = () => {
        themeIcons.forEach((themeIcon) => {
            themeIcon.innerText = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? '🌙' : '☀️';
        });
    }

    const setTheme = theme => {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon();
    };

    // Add the listener for the light/dark theme toggle.
    themeToggles.forEach((val) => {
        val.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    });

    // Set initial icon on load
    themeIcons.forEach((themeIcon) => {
        themeIcon.innerText = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? '🌙' : '☀️';
    });

    // Detect theme in the browser's storage.
    function updateTheme() {
        // Check if the user has a manually saved preference
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            document.documentElement.setAttribute('data-bs-theme', savedTheme);
        } else {
            // Otherwise, follow the system preference
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-bs-theme', systemTheme);
        }
    }

    // Run immediately
    updateTheme();

    // Listen for system changes (e.g., if their computer switches to night mode while they are reading)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (!localStorage.getItem('theme')) {
            updateTheme();
        }
    });

    // Start the carousel
    document.querySelectorAll(`button[data-bs-slide-to='0']`).forEach((elem) => elem.click());

});
