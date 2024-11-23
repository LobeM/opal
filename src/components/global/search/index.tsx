import { useMutationData } from '@/hooks/use-mutation-data';
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

  // WIP: Wire up sending invitations
  //   const {mutate, isPending} = useMutationData(['invite-member'], (data: {recieverId: string; email:string})=> inviteMembers())
  return <div>Search</div>;
};

export default Search;
