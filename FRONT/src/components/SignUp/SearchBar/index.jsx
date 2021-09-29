/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDogBreedsAndBehaviors } from '../../../actions/signup';

import searchIcon from '../../../assets/img/search.svg';
import closeIcon from '../../../assets/img/close-search.svg';
import './search-bar.scss';

const SearchBar = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogBreedsAndBehaviors());
  }, []);
  const breeds = useSelector((state) => state.signup.breeds);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = breeds.filter((breed) => (
      breed.label.toLowerCase().includes(searchWord.toLowerCase())));

    if (searchWord === '') {
      setFilteredData([]);
    }
    else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered('');
  };

  return (
    <div className="search">
      <div className="search__search-inputs">
        <input type="text" placeholder="Race" value={wordEntered} onChange={handleFilter} />
        <div className="search__search-inputs__icon">
          {
            filteredData.length === 0 ? <img src={searchIcon} alt="search icon" /> : <img onClick={clearInput} src={closeIcon} alt="close icon" className="search__search-inputs__icon__close" />
          }
        </div>
      </div>
      { filteredData.length !== 0 && (
      <div className="search__data-results">
        {/* <select name="breed">
          {
            filteredData.map((breed) => (
              <option value={breed.label} key={breed.id}>{breed.label}</option>
            ))
        }
        </select> */}
        {
            filteredData.map((breed) => (
              <p key={breed.id} className="search__data-results__breed">{breed.label}</p>
            ))
        }
      </div>
      )}
    </div>
  );
};

export default SearchBar;
