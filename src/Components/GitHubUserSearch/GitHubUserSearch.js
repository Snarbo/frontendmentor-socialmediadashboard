import { useState, useEffect } from 'react';

import ProfilePlaceholder from '../../assets/images/profile-placeholder.png';
import SearchIcon from '../../assets/images/icon-search.svg';
import LocationIcon from '../../assets/images/icon-location.svg';
import TwitterIcon from '../../assets/images/icon-twitter.svg';
import WebsiteIcon from '../../assets/images/icon-website.svg';
import CompanyIcon from '../../assets/images/icon-company.svg';

const GitHubUserSearch = () => {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [search, setSearch] = useState('octocat');
  const [showNoResults, setShowNoResults] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const API = 'https://api.github.com/users/';

  useEffect(() => {
    searchHandler();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const searchInputHandler = (e) => {
    setSearch(e.target.value);
  };

  const searchHandler = () => {
    setIsLoading(true);

    const fetchItems = async () => {
      const res = await fetch(API + search);

      if (!res.ok) {
        setShowNoResults(true);
        throw new Error('User failed to load.');
      }

      const resData = await res.json();

      setUser(resData);
      setIsLoading(false);
      setError(false);
      setShowNoResults(false);
    };

    fetchItems().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  };

  const getJoinDate = (date) => {
    const dateObj = new Date(date);

    const year = dateObj.getFullYear();
    const month = dateObj.toLocaleString('en-US', { month: 'short' });
    const day = dateObj.getDate();

    const convertedString = `Joined ${day} ${month} ${year}`;

    return convertedString;
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchHandler();
    }
  };
  const joinDate = getJoinDate(user.created_at);

  return (
    <div className="devfinder mt-[35px]">
      <div className="search flex flex-wrap items-center rounded-[15px] p-[7px] pl-4 md:p-2.5 md:pl-8">
        <img className="mr-[9px] md:mr-6" src={SearchIcon} alt="Search" width="24" height="24" />
        <input
          className="flex-1 mr-6 text-[13px] md:text-lg md:leading-[25px] bg-transparent outline-none"
          type="text"
          placeholder="Search GitHub username..."
          onChange={searchInputHandler}
          onKeyDown={handleKeyDown}
        />
        {showNoResults && <small className="mr-6 space-mono-bold text-[15px]">No results</small>}
        <button className="rounded-[10px] space-mono-bold py-3 px-4 md:px-6 text-sm md:text-base text-white transition-all" onClick={searchHandler}>
          Search
        </button>
      </div>
      {error && (
        <div className="loading rounded-[15px] mt-6 py-8 px-6 md:px-10 lg:px-12">
          <p className="text-[15px] leading-[25px]">{error}</p>
        </div>
      )}
      {isLoading && (
        <div className="loading rounded-[15px] mt-6 py-8 px-6 md:px-10 lg:px-12">
          <p className="text-[15px] leading-[25px]">Loading...</p>
        </div>
      )}
      {!isLoading && !error && !isMobile && (
        <div className="result rounded-[15px] flex mt-6 p-10 lg:p-12 lg:pt-[45px]">
          <div className="result-image mr-10">
            <img className="rounded-full object-cover" src={user.avatar_url && user.avatar_url !== null ? user.avatar_url : ProfilePlaceholder} alt="Profile" width="117" height="117" />
          </div>
          <div className="flex-1">
            <div className="result-profile">
              <div className="flex justify-between items-center">
                <h1 className="space-mono-bold text-[26px] leading-[38px]">{user.name ? user.name : 'Name'}</h1>
                <p className="space-mono-regular text-[15px] leading-[25px]">{user.created_at ? joinDate : ''}</p>
              </div>
              <a className="space-mono-regular text-base lowercase" href={user.html_url && user.html_url !== null ? user.html_url : '#'} target="_blank" rel="noreferrer">
                @{user.login ? user.login : 'name'}
              </a>
            </div>
            <div className="result-bio mt-6 lg:mt-5">
              <p className="space-mono-regular text-[15px] leading-[25px]">{user.bio}</p>
            </div>
            <div className="result-stats flex rounded-[10px] mt-8 pt-[15px] px-8 pb-[17px]">
              <div className="flex-1">
                <h4 className="space-mono-regular text-[13px] leading-5">Repos</h4>
                <h2 className="space-mono-bold text-[22px] leading-[33px]">{user.public_repos ? user.public_repos : '0'}</h2>
              </div>
              <div className="flex-1">
                <h4 className="space-mono-regular text-[13px] leading-5">Followers</h4>
                <h2 className="space-mono-bold text-[22px] leading-[33px]">{user.followers ? user.followers : '0'}</h2>
              </div>
              <div className="flex-1">
                <h4 className="space-mono-regular text-[13px] leading-5">Following</h4>
                <h2 className="space-mono-bold text-[22px] leading-[33px]">{user.following ? user.following : '0'}</h2>
              </div>
            </div>
            <div className="result-additional mt-8 lg:mt-10">
              <div className="md:flex flex-wrap m-[-10px]">
                <div className={`flex items-center p-2.5 md:w-1/2 ${user.location ? '' : 'opacity-50 pointer-events-none'}`}>
                  <div className="mr-5 min-w-[20px]">
                    <img src={LocationIcon} alt="Location" width="14" height="20" />
                  </div>
                  <a
                    className="space-mono-regular max-w-full text-[15px] leading-[25px] text-ellipsis whitespace-nowrap overflow-hidden hover:underline"
                    title={user.location && user.location !== null ? user.location : 'Not Available'}
                    href={user.location !== null ? 'http://maps.google.com/?q=' + user.location : '#'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user.location && user.location !== null ? user.location : 'Not Available'}
                  </a>
                </div>
                <div className={`flex items-center p-2.5 md:w-1/2 ${user.twitter_username ? '' : 'opacity-50 pointer-events-none'}`}>
                  <div className="mr-5 min-w-[20px]">
                    <img src={TwitterIcon} alt="Twitter" width="20" height="16" />
                  </div>
                  <a
                    className="space-mono-regular max-w-full text-[15px] leading-[25px] text-ellipsis whitespace-nowrap overflow-hidden hover:underline"
                    title={user.twitter_username !== null ? user.twitter_username : 'Not Available'}
                    href={user.twitter_username !== null ? 'https://twitter.com/' + user.twitter_username + '' : '#'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user.twitter_username && user.twitter_username !== null ? user.twitter_username : 'Not Available'}
                  </a>
                </div>
                <div className={`flex items-center p-2.5 md:w-1/2 ${user.blog ? '' : 'opacity-50 pointer-events-none'}`}>
                  <div className="mr-5 min-w-[20px]">
                    <img src={WebsiteIcon} alt="Website" width="20" height="20" />
                  </div>
                  <a
                    className="space-mono-regular max-w-full text-[15px] leading-[25px] text-ellipsis whitespace-nowrap overflow-hidden hover:underline"
                    title={user.blog !== null ? user.blog : 'Not Available'}
                    href={user.blog !== null ? user.blog : '#'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user.blog && user.blog !== null ? user.blog : 'Not Available'}
                  </a>
                </div>
                <div className={`flex items-center p-2.5 md:w-1/2 ${user.company ? '' : 'opacity-50 pointer-events-none'}`}>
                  <div className="mr-5 min-w-[20px]">
                    <img src={CompanyIcon} alt="Company" width="20" height="20" />
                  </div>
                  <p className="space-mono-regular max-w-full text-[15px] leading-[25px] text-ellipsis whitespace-nowrap overflow-hidden hover:underline">
                    {user.company && user.company !== null ? user.company : 'Not Available'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && !error && isMobile && (
        <div className="result rounded-[15px] mt-6 pt-8 px-6 pb-12">
          <div className="flex result-profile">
            <img className="rounded-full mr-5 h-full object-cover" src={user.avatar_url && user.avatar_url !== null ? user.avatar_url : ProfilePlaceholder} alt="Profile" width="70" height="70" />
            <div>
              <h1 className="space-mono-bold text-base">{user.name ? user.name : 'Name'}</h1>
              <a className="text-[13px] lowercase" href={user.html_url && user.html_url !== null ? user.html_url : '#'} target="_blank" rel="noreferrer">
                @{user.login ? user.login : 'name'}
              </a>
              <p className="text-[15px]">{user.created_at ? joinDate : ''}</p>
            </div>
          </div>
          <div className="result-bio mt-[35px]">
            <p className="text-[13px] leading-[25px]">{user.bio}</p>
          </div>
          <div className="result-stats flex rounded-[10px] mt-[25px] pt-[18px] px-[15px] pb-5 text-center">
            <div className="flex-1">
              <h4 className="text-[11px] leading-none">Repos</h4>
              <h2 className="space-mono-bold mt-2 text-base leading-none">{user.public_repos ? user.public_repos : '0'}</h2>
            </div>
            <div className="flex-1">
              <h4 className="text-[11px] leading-none">Followers</h4>
              <h2 className="space-mono-bold mt-2 text-base leading-none">{user.followers ? user.followers : '0'}</h2>
            </div>
            <div className="flex-1">
              <h4 className="text-[11px] leading-none">Following</h4>
              <h2 className="space-mono-bold mt-2 text-base leading-none">{user.following ? user.following : '0'}</h2>
            </div>
          </div>
          <div className="result-additional mt-6">
            <div className={`flex items-center ${user.location ? '' : 'opacity-50 pointer-events-none'}`}>
              <div className="mr-[13px] min-w-[20px]">
                <img src={LocationIcon} alt="Location" width="14" height="20" />
              </div>
              <a
                className="max-w-full text-[13px] text-ellipsis whitespace-nowrap overflow-hidden hover:underline"
                title={user.location && user.location !== null ? user.location : 'Not Available'}
                href={user.location !== null ? 'http://maps.google.com/?q=' + user.location : '#'}
                target="_blank"
                rel="noreferrer"
              >
                {user.location && user.location !== null ? user.location : 'Not Available'}
              </a>
            </div>
            <div className={`flex items-center mt-4 ${user.blog ? '' : 'opacity-50 pointer-events-none'}`}>
              <div className="mr-[13px] min-w-[20px]">
                <img src={WebsiteIcon} alt="Website" width="20" height="20" />
              </div>
              <a
                className="max-w-full text-[13px] text-ellipsis whitespace-nowrap overflow-hidden hover:underline"
                title={user.blog !== null ? user.blog : 'Not Available'}
                href={user.blog !== null ? user.blog : '#'}
                target="_blank"
                rel="noreferrer"
              >
                {user.blog && user.blog !== null ? user.blog : 'Not Available'}
              </a>
            </div>
            <div className={`flex items-center mt-4 ${user.twitter_username ? '' : 'opacity-50 pointer-events-none'}`}>
              <div className="mr-[13px] min-w-[20px]">
                <img src={TwitterIcon} alt="Twitter" width="20" height="16" />
              </div>
              <a
                className="max-w-full text-[13px] text-ellipsis whitespace-nowrap overflow-hidden hover:underline"
                title={user.twitter_username !== null ? user.twitter_username : 'Not Available'}
                href={user.twitter_username !== null ? 'https://twitter.com/' + user.twitter_username + '' : '#'}
                target="_blank"
                rel="noreferrer"
              >
                {user.twitter_username && user.twitter_username !== null ? user.twitter_username : 'Not Available'}
              </a>
            </div>
            <div className={`flex items-center mt-4 ${user.company ? '' : 'opacity-50 pointer-events-none'}`}>
              <div className="mr-[13px] min-w-[20px]">
                <img src={CompanyIcon} alt="Company" width="20" height="20" />
              </div>
              <p className="max-w-full text-[13px] text-ellipsis whitespace-nowrap overflow-hidden hover:underline">{user.company && user.company !== null ? user.company : 'Not Available'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubUserSearch;
