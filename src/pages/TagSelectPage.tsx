import { useState } from 'react';
import { techTags } from '@/data/techTags';
import { PLACE_HOLDER, POPULAR_TAG_IDS } from '@/constants';
import { SearchBox, Chip, TagItem } from '@/components';
import { useDebounce } from '@/hooks/useDebounce';
import { useWizardStore } from '@/store/useWizardStore';

export default function TagSelectPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const { draft, updateDraft } = useWizardStore();

  const selectedIds = draft.techStackIds;
  const popularTags = techTags.filter((t) => POPULAR_TAG_IDS.includes(t.id));

  const filtered = debouncedQuery
    ? techTags
        .filter((tag) => !selectedIds.includes(tag.id))
        .filter((tag) => tag.name.toLowerCase().includes(debouncedQuery.toLowerCase()))
        .map((tag) => tag.name)
    : [];

  const handleSelect = (name: string) => {
    const tag = techTags.find((tag) => tag.name === name);
    if (!tag) return;

    updateDraft({ techStackIds: [...selectedIds, tag.id] });
    setQuery('');
  };

  const handleToggle = (id: string) => {
    updateDraft({
      techStackIds: selectedIds.includes(id) ? selectedIds.filter((sid) => sid !== id) : [...selectedIds, id],
    });
  };

  const selectedTags = techTags.filter((tag) => selectedIds.includes(tag.id));

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="font-bold px-1">기술 스택</label>
        <SearchBox
          placeholder={PLACE_HOLDER.TECH}
          value={query}
          items={filtered}
          onChange={(e) => setQuery(e.target.value)}
          onSelect={handleSelect}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-bold px-1 text-sm text-gray-500">인기 태그</span>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => {
            const isSelected = selectedIds.includes(tag.id);
            return (
              <Chip key={tag.id} type="button" isSelected={isSelected} onClick={() => handleToggle(tag.id)}>
                {tag.name}
              </Chip>
            );
          })}
        </div>
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="font-bold px-1 text-sm text-gray-500">선택된 태그 ({selectedTags.length})</span>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <TagItem key={tag.id} tag={tag} onRemove={() => handleToggle(tag.id)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
