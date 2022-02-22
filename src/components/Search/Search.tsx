import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiSearch, clearSearch, SearchState } from '../../store/slices/searchSlice';
import { useTypedSelector, useTypedDispatch } from '../../hooks/typedRedux';
import Style from './css/Search.module.css';

const Search = () => {
  const dispatch = useTypedDispatch();
  const searchState = useTypedSelector((state) => state.search as SearchState);

  const [searchInput, setSearchInput] = useState(searchState.term);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      search: { value: string };
    };

    const search = target.search.value;

    dispatch(apiSearch({ term: search }));
  };

  const handleReset = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(clearSearch());

    setSearchInput('');
  };

  return (
    <div className={Style.Search}>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Search:
            <input type="text" name="search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          </label>
          &nbsp;
          <input type="submit" value="Submit" />
          &nbsp;
          <input
            type="reset"
            value="Reset"
            onClick={handleReset}
            style={{ visibility: searchInput !== '' || searchState.data.length > 0 ? 'visible' : 'hidden' }}
          />
        </form>
      </div>
      <div className={Style.SearchResults}>
        {searchState.term !== '' && searchState.data.length > 0 && (
          <>
            <h1>Results</h1>
            {searchState.data.map((result) => (
              <div className={Style.SearchResult} key={result.title}>
                <div className={Style.SearchResultLeft}>
                  <img src={result.photo} alt={result.shortDescription} />
                </div>
                <div className={Style.SearchResultRight}>
                  <h2>
                    <Link to={`/result/${result.title}`}>{result.title}</Link>
                  </h2>
                  {result.shortDescription}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
