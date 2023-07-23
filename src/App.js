import { useStateContext } from './Context/ThemeContext';

import Header from './Components/Master/Header';
import Followers from './Components/Followers';
import Overview from './Components/Overview';

function App() {
  const { currentTheme } = useStateContext();

  return (
    <div id={currentTheme} className="social-media-container pt-9 pb-[45px] lg:pb-[75px] min-h-screen">
      <div className="container">
        <Header />
        <main className="mt-[40px] lg:mt-[45px]">
          <Followers />
          <Overview />
        </main>
      </div>
    </div>
  );
}

export default App;
