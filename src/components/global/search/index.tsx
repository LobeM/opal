import { useSearch } from '@/hooks/use-search';
import React from 'react';

type Props = {
  workspaceId: string;
};

const Search = ({ workspaceId }: Props) => {
  const { query, onSearchQuery, isFetching, onUsers } = useSearch(
    'get-users',
    'USERS'
  );
  return <div>Search</div>;
};

export default Search;
