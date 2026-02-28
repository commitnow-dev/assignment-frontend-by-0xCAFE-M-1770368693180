import { useState } from 'react';
import type { MemberRole, TeamMember } from '@/types';
import { users } from '@/data/users';
import SearchBox from '@/components/SearchBox';
import UserItem from '@/components/UserItem';
import { useDebounce } from '@/hooks/useDebounce';

export default function TeamSetupPage() {
  const [query, setQuery] = useState('');
  const [members, setMembers] = useState<TeamMember[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  const filtered = debouncedQuery
    ? users
        .filter(user => !members.some(m => m.userId === user.id))
        .filter(user => user.name.toLowerCase().includes(debouncedQuery.toLowerCase()))
        .map(user => user.name)
    : [];

  const handleSelect = (name: string) => {
    const user = users.find(user => user.name === name);
    if (!user) return;
    
    // 처음 선택 시 역할을 member로 설정
    setMembers(prev => [...prev, { userId: user.id, role: 'member' }]);
    setQuery('');
  };

  const handleRoleChange = (userId: string, role: MemberRole) => {
    setMembers(prev => prev.map(member => member.userId === userId ? { ...member, role } : member));
  };

  const handleRemove = (userId: string) => {
    setMembers(prev => prev.filter(member => member.userId !== userId));
  };

  console.log(members)

  return (
    <div className="flex w-full flex-col gap-1">
      <label className="font-bold px-1">팀원 선택</label>
      <SearchBox
        placeholder="팀원을 검색해주세요"
        value={query}
        items={filtered}
        onChange={e => setQuery(e.target.value)}
        onSelect={handleSelect}
      />

      {members.length > 0 && (
        <ul className="flex flex-col gap-2 py-3">
          {members.map(member => {
            const user = users.find(u => u.id === member.userId)!;
            return (
              <li key={member.userId}>
                <UserItem
                  user={user}
                  role={member.role}
                  onRoleChange={role => handleRoleChange(member.userId, role)}
                  onRemove={() => handleRemove(member.userId)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
