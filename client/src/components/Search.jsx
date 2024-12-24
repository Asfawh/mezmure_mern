import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

// import SearchResults from './SearchResult';

const Search = () => {
  const [query, setQuery] = useState({});
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      // navigate(`/songs/search/${query}`);
      navigate(`/songs/search?query=${query}`);
      setSearchSubmitted(true);
      console.log('Search query is .', query);
    } else {
      console.log('Search query is empty.', errors);
    }
  };

  // const handleQueryChange = (e) => {
  //   setQuery(e.target.value);
  //   setSearchSubmitted(false); // Reset search when query changes
  // };

  return (
    <Form
      inline
      onSubmit={handleSearch}
      className="d-flex justify-content-center"
    >
      <FormControl
        type="text"
        name="search"
        placeholder="Search by song name"
        className="mr-sm-2 "
        style={{ width: '550px' }}
        // style={{ width: '100%' }}
        // value={searchQuery}
        onChange={(e) => {
          setQuery(e.target.value);
          setSearchSubmitted(false); // Reset search when query changes
        }}
      />

      <button type="submit" className="btn btn-warning">
        <svg width="15px" height="15px">
          <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
        </svg>
      </button>
      {/* {searchSubmitted && <SearchResults query={query} />}
      <SearchResults query={query} /> */}
    </Form>
  );
};

export default Search;
