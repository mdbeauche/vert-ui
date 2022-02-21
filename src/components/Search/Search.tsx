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
    </>
  );
};

export default Search;
