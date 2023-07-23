import { useEffect } from 'react';
import { useStateContext } from '../../Context/ThemeContext';

const LightDarkMode = () => {
  const { currentTheme, setCurrentTheme } = useStateContext();

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  return (
    <button className="dark-light-toggle relative rounded-xl w-12 h-6" onClick={toggleTheme}>
      <span className="toggle absolute top-[3px] bottom-[3px] rounded-full w-[18px] h-[18px]"></span>
    </button>
  );
};

export default LightDarkMode;
