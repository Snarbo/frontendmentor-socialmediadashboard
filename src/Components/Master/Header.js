import LightDarkMode from './LightDarkMode';

const Header = () => {
  return (
    <header className="header flex justify-between items-center">
      <a className="space-mono-bold text-[26px] leading-none" href="/">
        devfinder
      </a>
      <LightDarkMode />
    </header>
  );
};

export default Header;
