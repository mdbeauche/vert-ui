import { apiSearch, SearchState } from '../../store/slices/searchSlice';
import { useTypedSelector, useTypedDispatch } from '../../hooks/typedRedux';

const Search = () => {
  const dispatch = useTypedDispatch();
  const searchState = useTypedSelector((state) => state.search as SearchState);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // submit search
    const target = event.target as typeof event.target & {
      search: { value: string };
    };

    const search = target.search.value;

    dispatch(apiSearch({ term: search }));
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Search:
            <input type="text" name="search" defaultValue="" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div>SearchState: {JSON.stringify(searchState)}</div>
      <div>
        {searchState.term !== '' && searchState.data.length > 0 && (
          <>
            {searchState.data.map((result) => (
              <div key={result.title}>
                {result.title},{result.photo},{result.shortDescription},{result.description}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Search;
