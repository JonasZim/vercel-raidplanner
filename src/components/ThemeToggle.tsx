import React, { useState, useEffect } from 'react';

const ThemeToggle: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkTheme) {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [isDarkTheme]);

  const toggleTheme = (): void => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <button onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
