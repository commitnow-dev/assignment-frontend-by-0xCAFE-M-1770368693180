import { User } from "../../types";
import { SearchIcon, UserPlus } from "lucide-react";

interface MemberSearchProps {
  isSearching: boolean;
  results: User[];
  onSearch: (term: string) => void;
  onSelect: (user: User) => void;
}

export function MemberSearch({
  isSearching,
  results,
  onSearch,
  onSelect,
}: MemberSearchProps) {
  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="이름 또는 이메일로 팀원 검색"
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-12 pl-11 text-sm transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none"
          onChange={(e) => onSearch(e.target.value)}
        />
        <SearchIcon className="absolute top-3.5 left-4 h-5 w-5 text-slate-400" />

        {isSearching && (
          <div className="absolute top-3.5 right-4">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          <div className="max-h-[240px] overflow-y-auto p-1">
            {results.map((user) => (
              <button
                key={user.id}
                onClick={() => onSelect(user)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-indigo-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                    {user.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{user.name}</p>
                    <p className="text-[11px] text-slate-500">{user.email}</p>
                  </div>
                </div>
                <UserPlus className="h-4 w-4 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
