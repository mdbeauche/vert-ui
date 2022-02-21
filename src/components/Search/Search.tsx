const Search = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // submit search
    const target = event.target as typeof event.target & {
      search: { value: string };
    };

    const search = target.search.value;

    console.log('search: ', search);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input type="text" name="search" defaultValue="" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Search;
