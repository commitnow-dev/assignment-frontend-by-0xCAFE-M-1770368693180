import { useState } from 'react';
import { techTags } from '@/data/techTags';
import { PLACE_HOLDER, POPULAR_TECH_TAGS } from '@/constants';
import SearchBox from '@/components/SearchBox';
import Chip from '@/components/Chip';
import TagItem from '@/components/TagItem';
import { useDebounce } from '@/hooks/useDebounce';
import { useWizardStore } from '@/store/useWizardStore';

export default function TagSelectPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const { draft, updateDraft } = useWizardStore();

  const selectedIds = draft.techStackIds;

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
      techStackIds: selectedIds.includes(id)
        ? selectedIds.filter((sid) => sid !== id)
        : [...selectedIds, id],
    });
  };

  const handleRemove = (id: string) => {
    updateDraft({ techStackIds: selectedIds.filter((sid) => sid !== id) });
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
          {POPULAR_TECH_TAGS.map((tag) => {
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
              <TagItem tag={tag} onRemove={() => handleRemove(tag.id)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
