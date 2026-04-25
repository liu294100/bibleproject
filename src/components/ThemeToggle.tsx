'use client';

import React, { useState, useEffect } from 'react';
import { Minus, Moon, Plus, Sun } from 'lucide-react';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { useLocale } from '@/components/LocaleProvider';

const ThemeToggle = () => {
  const { t } = useLocale();
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
    <div className="ym-noprint theme-toggle-group">
      <LocaleSwitcher />
      {darkMode ? (
        <button
          type="button"
          className="theme-toggle-button"
          title={t('浅色模式 / Light mode', 'Light mode / 浅色模式')}
          aria-label={t('切换到浅色模式', 'Switch to light mode')}
          onClick={toggleDarkMode}
        >
          <Sun size={16} strokeWidth={2} />
        </button>
      ) : (
        <button
          type="button"
          className="theme-toggle-button"
          title={t('深色模式 / Dark mode', 'Dark mode / 深色模式')}
          aria-label={t('切换到深色模式', 'Switch to dark mode')}
          onClick={toggleDarkMode}
        >
          <Moon size={16} strokeWidth={2} />
        </button>
      )}
      <button
        type="button"
        className="theme-toggle-button"
        title={t('缩小字号 / Decrease font size', 'Decrease font size / 缩小字号')}
        aria-label={t('缩小字号', 'Decrease font size')}
        onClick={decreaseFontSize}
      >
        <Minus size={16} strokeWidth={2} />
      </button>
      <button
        type="button"
        className="theme-toggle-button"
        title={t('放大字号 / Increase font size', 'Increase font size / 放大字号')}
        aria-label={t('放大字号', 'Increase font size')}
        onClick={increaseFontSize}
      >
        <Plus size={16} strokeWidth={2} />
      </button>
    </div>
  );
};

export default ThemeToggle;
