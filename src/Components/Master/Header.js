import { useStateContext } from '../../Context/ThemeContext';

import LightDarkMode from './LightDarkMode';

const Header = () => {
  const { totalFollowers } = useStateContext();

  return (
    <header className="header lg:flex justify-between">
      <div>
        <h1 className="text-2xl font-bold lg:text-[28px]">{document.title}</h1>
        <p className="mt-1 text-sm font-bold">Total Followers: {totalFollowers}</p>
      </div>
      <hr className="mt-6 lg:hidden" />
      <div className="flex justify-between items-center mt-[19px] lg:m-0">
        <label className="text-sm font-bold leading-none lg:mr-[13px]">Dark Mode</label>
        <LightDarkMode />
      </div>
    </header>
  );
};

export default Header;
