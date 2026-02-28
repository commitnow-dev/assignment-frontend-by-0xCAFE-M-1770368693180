import { useState } from 'react';
import SearchBox from '@/components/SearchBox';
import { useDebounce } from '@/hooks/useDebounce';
import { users } from '@/data/users';

export default function TeamSetupPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const filtered = debouncedQuery
    ? users
        .filter(user => user.name.toLowerCase().includes(debouncedQuery.toLowerCase()))
        .map(user => user.name)
    : [];

  return (
    <div className="flex w-full items-center justify-center">
      <SearchBox
        placeholder="팀원을 검색해주세요"
        value={query}
        items={filtered}
        onChange={e => setQuery(e.target.value)}
      />
    </div>
  );
}
