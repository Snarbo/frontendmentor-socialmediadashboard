import Header from './Components/Master/Header';
import GitHubUserSearch from './Components/GitHubUserSearch/GitHubUserSearch';
import { useStateContext } from './store/ThemeContext';

function App() {
  const { currentTheme } = useStateContext();

  return (
    <div id={currentTheme} className="devfinder-container pt-[30px] md:pt-[140px] lg:pt-[145px] pb-20 md:pb-60 lg:pb-[145px] min-h-screen">
      <div className="container">
        <Header />
        <GitHubUserSearch />
      </div>
    </div>
  );
}

export default App;
