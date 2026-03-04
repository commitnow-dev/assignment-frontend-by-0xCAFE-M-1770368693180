import { useState } from 'react';
import type { MemberRole } from '@/types';
import { users } from '@/data/users';
import { PLACE_HOLDER } from '@/constants';
import { SearchBox, UserItem } from '@/components';
import { useDebounce } from '@/hooks/useDebounce';
import { useWizardStore } from '@/store/useWizardStore';

export default function TeamSetupPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const { draft, updateDraft } = useWizardStore();

  const members = draft.teamMembers;

  const filtered = debouncedQuery
    ? users
        .filter(user => !members.some(m => m.userId === user.id))
        .filter(user => user.name.toLowerCase().includes(debouncedQuery.toLowerCase()))
        .map(user => user.name)
    : [];

  const handleSelect = (name: string) => {
    const user = users.find(user => user.name === name);
    if (!user) return;
    updateDraft({ teamMembers: [...members, { userId: user.id, role: 'member' }] });
    setQuery('');
  };

  const handleRoleChange = (userId: string, role: MemberRole) => {
    updateDraft({
      teamMembers: members.map(m => m.userId === userId ? { ...m, role } : m),
    });
  };

  const handleRemove = (userId: string) => {
    updateDraft({ teamMembers: members.filter(m => m.userId !== userId) });
  };

  return (
    <div className="flex w-full flex-col gap-1">
      <label className="font-bold px-1">팀원 선택</label>
      <SearchBox
        placeholder={PLACE_HOLDER.TEAM_MEMBER}
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
