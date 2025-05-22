import { useEffect, useState } from 'react';

const useQueryParams = () => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSearch(window.location.search);
    }
  }, []);

  return search;
};

export default useQueryParams;
