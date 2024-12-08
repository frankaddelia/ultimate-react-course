import { useRef } from 'react';
import { useKey } from './hooks/useKey';

const Search = ({ query, setQuery }) => {
  const inputElem = useRef(null);

  useKey('Enter', function () {
    if (document.activeElement === inputElem.current) return;
    inputElem.current.focus();
    setQuery('');
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElem}
    />
  );
};

export default Search;
