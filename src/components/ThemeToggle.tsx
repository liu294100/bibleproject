'use client';

import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(16);

  useEffect(() => {
    // Check if user has a preference stored
    const savedTheme = localStorage.getItem('theme');
    const savedFontSize = localStorage.getItem('fontSize');

    // Apply saved theme or default to system preference
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Apply saved font size
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize, 10));
      document.documentElement.style.fontSize = `${parseInt(savedFontSize, 10)}px`;
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const increaseFontSize = () => {
    if (fontSize < 24) {
      const newSize = fontSize + 1;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}px`;
      localStorage.setItem('fontSize', newSize.toString());
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 14) {
      const newSize = fontSize - 1;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}px`;
      localStorage.setItem('fontSize', newSize.toString());
    }
  };

  return (
    <div className="ym-noprint shareright">
      {darkMode ? (
        <span className="fa-stack color-mode__btn light--hidden">
          <a title="Light mode" onClick={toggleDarkMode} style={{ cursor: 'pointer' }}>
            <i className="fas fa-sun"></i>
          </a>
        </span>
      ) : (
        <span className="fa-stack color-mode__btn dark--hidden">
          <a title="Dark mode" onClick={toggleDarkMode} style={{ cursor: 'pointer' }}>
            <i className="fas fa-moon"></i>
          </a>
        </span>
      )}
      <span className="fa-stack text-decrease">
        <a title="Decrease font size" onClick={decreaseFontSize} style={{ cursor: 'pointer' }}>
          <i className="fas fa-minus"></i>
        </a>
      </span>
      <span className="fa-stack text-increase">
        <a title="Increase font size" onClick={increaseFontSize} style={{ cursor: 'pointer' }}>
          <i className="fas fa-plus"></i>
        </a>
      </span>
    </div>
  );
};

export default ThemeToggle;
