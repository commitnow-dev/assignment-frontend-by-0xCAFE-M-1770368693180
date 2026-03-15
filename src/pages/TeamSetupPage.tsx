import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { MemberRole } from '@/types';
import { users } from '@/data/users';
import { PLACE_HOLDER } from '@/constants';
import { SearchBox, UserItem } from '@/components';
import { useDebounce } from '@/hooks/useDebounce';
import { useWizardStore } from '@/store/useWizardStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { TeamMemberSchema, type TeamMemberValues } from '@/schemas/wizard';

export default function TeamSetupPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const { draft, updateDraft } = useWizardStore();
  const { handleNext } = useWizardNavigation();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TeamMemberValues>({
    resolver: zodResolver(TeamMemberSchema),
    defaultValues: { teamMembers: draft.teamMembers },
  });

  const members = watch('teamMembers');

  const filtered = debouncedQuery
    ? users
        .filter((user) => !members.some((m) => m.userId === user.id))
        .filter((user) => user.name.toLowerCase().includes(debouncedQuery.toLowerCase()))
        .map((user) => user.name)
    : [];

  const setMembers = (updated: TeamMemberValues['teamMembers']) => {
    setValue('teamMembers', updated, { shouldValidate: true });
    updateDraft({ teamMembers: updated });
  };

  const handleSelect = (name: string) => {
    const user = users.find((u) => u.name === name);
    if (!user) return;
    setMembers([...members, { userId: user.id, role: 'member' }]);
    setQuery('');
  };

  const handleRoleChange = (userId: string, role: MemberRole) => {
    setMembers(members.map((m) => (m.userId === userId ? { ...m, role } : m)));
  };

  const handleRemove = (userId: string) => {
    setMembers(members.filter((m) => m.userId !== userId));
  };

  return (
    <form
      id="wizard-step-form"
      onSubmit={handleSubmit((values) => {
        updateDraft(values);
        handleNext();
      })}
      className="flex w-full flex-col"
    >
      <label className="font-bold px-1">팀원 선택</label>
      <SearchBox
        placeholder={PLACE_HOLDER.TEAM_MEMBER}
        value={query}
        items={filtered}
        onChange={(e) => setQuery(e.target.value)}
        onSelect={handleSelect}
      />

      <div className="flex w-full justify-center py-1">
        <p className="text-red-500">{errors.teamMembers?.message}</p>
      </div>

      {members.length > 0 && (
        <ul className="flex flex-col gap-2 py-3">
          {members.map((member) => {
            const user = users.find((u) => u.id === member.userId);
            if (!user) return null;

            return (
              <li key={member.userId}>
                <UserItem
                  user={user}
                  role={member.role}
                  onRoleChange={(role) => handleRoleChange(member.userId, role)}
                  onRemove={() => handleRemove(member.userId)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
}
