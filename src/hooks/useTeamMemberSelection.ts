import { useState, useCallback, useEffect } from "react";
import { User, MemberRole } from "../types";
import { useWizardStore } from "../store/useWizardStore";
import { useDebounce } from "../util/useDebounce";

export function useTeamMemberSelection() {
  const { draft, setDraft, setStepValid } = useWizardStore();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<(User & { role: MemberRole })[]>([]);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch("/data/users.json");
        const users: User[] = await response.json();
        setAllUsers(users);

        if (draft.teamMembers.length > 0) {
          const restored = draft.teamMembers
            .map((tm) => {
              const user = users.find((u) => u.id === tm.userId);
              return user ? { ...user, role: tm.role } : null;
            })
            .filter((m): m is User & { role: MemberRole } => m !== null);
          setSelectedMembers(restored);
        }
      } catch (e) {
        console.error("Failed to load users:", e);
      }
    }
    loadUsers();
  }, []);

  useEffect(() => {
    setDraft({
      teamMembers: selectedMembers.map((m) => ({ userId: m.id, role: m.role })),
    });
    setStepValid("step2", selectedMembers.length > 0);
  }, [selectedMembers, setDraft, setStepValid]);

  const performSearch = useCallback((term: string) => {
    if (!term.trim()) {
      setSearchResult([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const normalizedTerm = term.toLowerCase();
    const selectedIds = new Set(selectedMembers.map(m => m.id));

    const filtered = allUsers.filter((u) => {
      const matches = u.name.toLowerCase().includes(normalizedTerm) ||
                     u.email.toLowerCase().includes(normalizedTerm);
      return matches && !selectedIds.has(u.id);
    });

    setSearchResult(filtered);
    setIsSearching(false);
  }, [allUsers, selectedMembers]);

  const onSearch = useCallback(useDebounce(performSearch, 300), [performSearch]);

  return {
    searchResult,
    isSearching,
    selectedMembers,
    onSearch,
    setSelectedMembers,
    setSearchResult,
  };
}
