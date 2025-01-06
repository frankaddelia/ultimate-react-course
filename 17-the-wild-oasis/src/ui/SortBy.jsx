import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  const [searchParams, setSearchParmas] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParmas(searchParams);
  }

  return (
    <Select
      options={options}
      type='white'
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
