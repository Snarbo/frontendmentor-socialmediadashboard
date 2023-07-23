import { useState, useEffect } from 'react';

const Overview = () => {
  const [overview, setOverview] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const API = 'https://react-dashboard-d90f2-default-rtdb.firebaseio.com/dashboard/overview.json';

  useEffect(() => {
    const fetchOverview = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(API);

        if (!res.ok) {
          throw new Error('Overview failed to load.');
        }

        const resData = await res.json();

        const updatedOverview = resData.map((overview) => {
          let currentValue = overview.currentValue;
          if (currentValue > 10000) currentValue = formatNumber(currentValue);

          let percentageValue = overview.percentageValue;
          if (percentageValue > 0) {
            overview.status = 'positive';
          } else if (percentageValue < 0) {
            overview.status = 'negative';
            percentageValue = Math.abs(percentageValue);
          }

          return { ...overview, currentValue, percentageValue: percentageValue };
        });

        setOverview(updatedOverview);
        setError(null);
      } catch (error) {
        setError(error.message);
      }

      setIsLoading(false);
    };

    fetchOverview();
  }, []);

  const formatNumber = (num) => {
    const suffixes = ['', 'k', 'M', 'B', 'T'];
    const suffixNum = Math.floor(('' + num).length / 3);
    let shortNumber = parseFloat((suffixNum !== 0 ? num / Math.pow(1000, suffixNum) : num).toPrecision(3));

    if (shortNumber % 1 !== 0) {
      shortNumber = Math.floor(shortNumber);
    }

    return shortNumber + suffixes[suffixNum];
  };

  const socialURLs = {
    facebook: 'https://www.facebook.com/nathan.f/',
    twitter: 'https://twitter.com/nathanf',
    instagram: 'https://www.instagram.com/nathan/',
    youtube: 'https://www.youtube.com/@NathanF',
  };

  return (
    <section className="overview mt-[45px]">
      <h2 className="text-2xl font-bold">Overview - Today</h2>
      <div className={`overview-items items grid gap-4 lg:gap-[30px] mt-[25px] ${error || isLoading ? '' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
        {error && (
          <div className="overview-item item rounded-[5px] pt-[30px] px-6 pb-6 text-center error">
            <p className="font-bold">{error}</p>
          </div>
        )}
        {isLoading ? (
          <div className="overview-item item rounded-[5px] pt-[30px] px-6 pb-6 text-center loading">
            <p className="font-bold">Loading...</p>
          </div>
        ) : (
          overview.map((overviewItem, id) => {
            const social = overviewItem.social.toLowerCase();
            const url = socialURLs[social] || '';
            const title = url;

            return (
              <a
                key={id}
                className={`overview-item item rounded-[5px] pt-[25px] pr-[30px] pb-5 pl-6 transition-all cursor-pointer link ${overviewItem.social.toLowerCase()}`}
                href={url}
                title={title}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold">{overviewItem.title}</h3>
                  <img src={`./images/icons/${overviewItem.social.toLowerCase()}.svg`} alt="Social Icon" />
                </div>
                <div className="flex justify-between items-center mt-5">
                  <h2 className="text-[32px] font-bold">{overviewItem.currentValue}</h2>
                  <small className={`relative pl-3 text-xs font-bold ${overviewItem.status}`}>{overviewItem.percentageValue}%</small>
                </div>
              </a>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Overview;
