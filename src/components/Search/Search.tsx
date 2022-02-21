import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

const Search = () => {
  const [searchResults, setSearchResults] = useState<Array<string>>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // submit search
    const target = event.target as typeof event.target & {
      search: { value: string };
    };

    const search = target.search.value;

    interface SearchResult {
      title: string;
      photo: string;
      shortDescription: string;
      description: string;
    }

    interface SearchResultResponse {
      data: SearchResult[];
    }

    axios.post<SearchResultResponse>('http://localhost:5000/search', { term: search }).then((response) => {
      console.log('Server response:');
      console.log(response.data);
    });

    console.log('search: ', search);
    setSearchResults([search]);
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
      <div>Results: {searchResults}</div>
    </>
  );
};

export default Search;
