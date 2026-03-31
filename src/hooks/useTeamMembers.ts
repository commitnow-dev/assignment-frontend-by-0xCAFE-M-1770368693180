import { useState, useCallback, useEffect } from "react";
import { User, MemberRole } from "../types";
import { useWizardStore } from "../store/useWizardStore";
import { useDebounce } from "../util/useDebounce";

export function useTeamMembers() {
  const { draft, setDraft, setStepValid } = useWizardStore();
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<
    (User & { role: MemberRole })[]
  >([]);

  useEffect(() => {
    async function restoreFromStore() {
      if (draft.teamMembers.length === 0) return;
      try {
        const response = await fetch("/data/users.json");
        const allUsers: User[] = await response.json();
        const restored = draft.teamMembers
          .map((tm) => {
            const user = allUsers.find((u) => u.id === tm.userId);
            return user ? { ...user, role: tm.role } : null;
          })
          .filter((m): m is User & { role: MemberRole } => m !== null);
        setSelectedMembers(restored);
      } catch (e) {
        console.error("Failed to restore members:", e);
      }
    }
    restoreFromStore();
  }, []);

  useEffect(() => {
    setDraft({
      teamMembers: selectedMembers.map((m) => ({ userId: m.id, role: m.role })),
    });
    setStepValid("step2", selectedMembers.length > 0);
  }, [selectedMembers, setDraft, setStepValid]);

  const onSearch = useCallback(
    useDebounce(async (term: string) => {
      if (!term.trim()) {
        setSearchResult([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const res = await fetch("/data/users.json");
        const data: User[] = await res.json();
        setSearchResult(
          data.filter(
            (u) =>
              u.name.toLowerCase().includes(term.toLowerCase()) ||
              u.email.toLowerCase().includes(term.toLowerCase())
          )
        );
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
  );

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

  return {
    searchResult,
    isSearching,
    selectedMembers,
    onSearch,
    addMember,
    updateRole,
    removeMember,
  };
}
