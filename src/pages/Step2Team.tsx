import { WizardCardLayout } from "../components/WizardCardLayout";
import { useTeamMemberSelection } from "../hooks/useTeamMemberSelection";
import { MemberSearch } from "../components/team/MemberSearch";
import { MemberList } from "../components/team/MemberList";
import { User, MemberRole } from "../types";

export function Step2Team() {
  const {
    searchResult,
    isSearching,
    selectedMembers,
    onSearch,
    setSelectedMembers,
    setSearchResult,
  } = useTeamMemberSelection();

  const addMember = (user: User) => {
    if (!selectedMembers.find((m) => m.id === user.id)) {
      setSelectedMembers((prev) => [...prev, { ...user, role: "member" }]);
      setSearchResult([]);
    }
  };

  const updateRole = (id: string, role: MemberRole) => {
    setSelectedMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role } : m))
    );
  };

  const removeMember = (id: string) => {
    setSelectedMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <WizardCardLayout>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Step 2. 팀 구성
        </h2>
        <p className="mt-1 text-slate-600">
          함께 프로젝트를 진행할 팀원을 검색하고 역할을 설정하세요.
        </p>
      </div>

      <div className="space-y-6">
        <MemberSearch
          isSearching={isSearching}
          results={searchResult}
          onSearch={onSearch}
          onSelect={addMember}
        />

        <MemberList
          members={selectedMembers}
          onUpdateRole={updateRole}
          onRemove={removeMember}
        />
      </div>
    </WizardCardLayout>
  );
}
