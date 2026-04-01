import { useState, useCallback, useEffect } from "react";
import { WizardCardLayout } from "../components/WizardCardLayout";
import { TechTag } from "../types";
import { useDebounce } from "../util/useDebounce";
import { useWizardStore } from "../store/useWizardStore";
import { SearchIcon, Plus, X, Hash } from "lucide-react";

export function Step3TechStack() {
  const { draft, setDraft, setStepValid } = useWizardStore();
  const [allTags, setAllTags] = useState<TechTag[]>([]);
  const [searchResult, setSearchResult] = useState<TechTag[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTags, setSelectedTags] = useState<TechTag[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/tech-tags.json");
        const data: TechTag[] = await response.json();
        setAllTags(data);

        if (draft.techStackIds.length > 0) {
          const restored = draft.techStackIds
            .map((id) => data.find((t) => t.id === id))
            .filter((t): t is TechTag => !!t);
          setSelectedTags(restored);
        }
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setDraft({ techStackIds: selectedTags.map((t) => t.id) });
    setStepValid("step3", selectedTags.length > 0);
  }, [selectedTags, setDraft, setStepValid]);

  const handleSearch = useCallback(
    useDebounce((term: string) => {
      if (!term.trim()) {
        setSearchResult([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      const filtered = allTags.filter(
        (tag) =>
          tag.name.toLowerCase().includes(term.toLowerCase()) ||
          tag.category.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResult(filtered);
      setIsSearching(false);
    }, 300),
    [allTags]
  );

  const addTag = (tag: TechTag) => {
    if (!selectedTags.find((t) => t.id === tag.id)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setSearchResult([]);
  };

  const removeTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter((t) => t.id !== tagId));
  };

  const popularTags = allTags.slice(0, 3);

  return (
    <WizardCardLayout>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Step 3. 기술 스택
        </h2>
        <p className="mt-1 text-slate-600">
          프로젝트에 사용될 주요 기술들을 선택해 주세요.
        </p>
      </div>

      <div className="space-y-8">
        {/* 검색 영역 */}
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              placeholder="기술 스택 검색"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-12 pl-11 text-sm transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <SearchIcon className="absolute top-3.5 left-4 h-5 w-5 text-slate-400" />

            {isSearching && (
              <div className="absolute top-3.5 right-4">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
              </div>
            )}
          </div>

          {/* 검색 결과 목록 */}
          {searchResult.length > 0 && (
            <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
              <div className="max-h-[240px] overflow-y-auto p-1">
                {searchResult.map((tag) => {
                  const isSelected = selectedTags.some((t) => t.id === tag.id);
                  return (
                    <button
                      key={tag.id}
                      onClick={() => addTag(tag)}
                      disabled={isSelected}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-indigo-50 disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                          <Hash className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {tag.name}
                          </p>
                          <p className="text-[10px] tracking-tight text-slate-400 uppercase">
                            {tag.category}
                          </p>
                        </div>
                      </div>
                      {isSelected ? (
                        <span className="text-xs font-medium text-indigo-600">
                          추가됨
                        </span>
                      ) : (
                        <Plus className="h-4 w-4 text-slate-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 인기 태그 추천 */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
            추천 태그
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => {
              const isSelected = selectedTags.some((t) => t.id === tag.id);
              return (
                <button
                  key={tag.id}
                  onClick={() => addTag(tag)}
                  disabled={isSelected}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    isSelected
                      ? "cursor-default bg-slate-100 text-slate-400"
                      : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                  }`}
                >
                  <Hash className="h-3.5 w-3.5" />
                  {tag.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 선택된 태그 목록 */}
        <div className="space-y-3 pt-4">
          <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
            선택된 기술 ({selectedTags.length})
          </h3>
          <div className="flex min-h-[44px] flex-wrap gap-2 rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/30 p-4">
            {selectedTags.length > 0 ? (
              selectedTags.map((tag) => (
                <div
                  key={tag.id}
                  className="animate-in fade-in zoom-in-95 flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm"
                >
                  {tag.name}
                  <button
                    onClick={() => removeTag(tag.id)}
                    className="ml-1 rounded-md p-0.5 transition-colors hover:bg-indigo-100 hover:text-indigo-800"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <p className="w-full py-1 text-center text-sm text-slate-400">
                아직 선택된 기술이 없습니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </WizardCardLayout>
  );
}
