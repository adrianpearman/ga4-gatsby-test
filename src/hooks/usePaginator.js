import { useState } from 'react';

function usePaginator(items, defaultPageItems, additionalItemsPerPage) {
  const [page, setPage] = useState(0);

  const numberOfItemsToShow = defaultPageItems + page * additionalItemsPerPage;
  const visibleItems = items.slice(0, numberOfItemsToShow);

  const loadMore = () => {
    setPage(page + 1);
  };

  const hasMoreItems = numberOfItemsToShow < items.length;

  return [visibleItems, loadMore, hasMoreItems];
}

export default usePaginator;
