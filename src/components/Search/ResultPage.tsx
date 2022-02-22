import { Link, Navigate, useParams } from 'react-router-dom';
import { SearchState } from '../../store/slices/searchSlice';
import { useTypedSelector } from '../../hooks/typedRedux';

const ResultPage = () => {
  const { title = '' } = useParams<{ title?: string }>();
  const searchState = useTypedSelector((state) => state.search as SearchState);

  const result = searchState.data.find((itm) => itm.title === title);

  if (result === undefined) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div>
        <h1>{result.title}</h1>
        <img src={result.photo} alt={result.shortDescription} />
        <p>{result.description}</p>
        <Link to="/">Return to search results</Link>
      </div>
    </>
  );
};

export default ResultPage;
