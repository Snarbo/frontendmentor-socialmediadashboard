import { useState, useEffect } from 'react';
import { useStateContext } from '../Context/ThemeContext';

const Followers = () => {
  const { setTotalFollowers } = useStateContext();
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const API = 'https://react-dashboard-d90f2-default-rtdb.firebaseio.com/dashboard/followers.json';

  useEffect(() => {
    const fetchFollowers = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(API);

        if (!res.ok) {
          throw new Error('Followers failed to load.');
        }

        const resData = await res.json();

        let sumFollowers = 0;
        const updatedFollowers = resData.map((follower) => {
          let currentFollowers = follower.currentFollowers;
          sumFollowers += currentFollowers;

          if (currentFollowers > 10000) currentFollowers = formatNumber(currentFollowers);

          let followersToday = follower.today;
          if (followersToday > 0) {
            follower.status = 'positive';
          } else if (followersToday < 0) {
            follower.status = 'negative';
            followersToday = Math.abs(followersToday);
          }

          return { ...follower, currentFollowers, today: followersToday };
        });

        sumFollowers = sumFollowers.toLocaleString();

        setFollowers(updatedFollowers);
        setTotalFollowers(sumFollowers);
        setError(null);
      } catch (error) {
        setError(error.message);
      }

      setIsLoading(false);
    };

    fetchFollowers();
  }, [setTotalFollowers]);

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
    <section className="followers">
      <div className={`follower-items items grid gap-4 lg:gap-[30px] ${error || isLoading ? '' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
        {error && (
          <div className="follower-item item rounded-[5px] pt-[30px] px-6 pb-6 text-center error">
            <p className="font-bold">{error}</p>
          </div>
        )}
        {isLoading ? (
          <div className="follower-item item rounded-[5px] pt-[30px] px-6 pb-6 text-center loading">
            <p className="font-bold">Loading...</p>
          </div>
        ) : (
          followers.map((followItem, id) => {
            const social = followItem.social.toLowerCase();
            const url = socialURLs[social] || '';
            const title = url;

            return (
              <a
                key={id}
                className={`follower-item item overflow-hidden relative rounded-[5px] pt-[30px] px-6 pb-6 text-center transition-all cursor-pointer link ${social}`}
                href={url}
                title={title}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex justify-center items-center">
                  <img className="mr-2" src={`./images/icons/${social}.svg`} alt="Social Icon" />
                  <span className="text-xs font-bold">{followItem.screenname}</span>
                </div>
                <h2 className="mt-[30px] text-[56px] font-bold leading-[48px] tracking-[-2px]">{followItem.currentFollowers}</h2>
                <p className="mt-2.5 text-xs tracking-[5px] uppercase">{social === 'youtube' ? 'Subscribers' : 'Followers'}</p>
                <small className={`inline-block relative mt-[25px] pl-3 text-xs font-bold ${followItem.status}`}>{followItem.today} Today</small>
              </a>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Followers;
