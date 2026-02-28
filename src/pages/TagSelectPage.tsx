import { useState } from 'react';
import { techTags } from '@/data/techTags';
import { POPULAR_TECH_TAGS } from '@/constants/tags';
import SearchBox from '@/components/SearchBox';
import Chip from '@/components/Chip';
import TagItem from '@/components/TagItem';
import { useDebounce } from '@/hooks/useDebounce';

export default function TagSelectPage() {
  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  const filtered = debouncedQuery
    ? techTags
        .filter((tag) => !selectedIds.includes(tag.id))
        .filter((tag) => tag.name.toLowerCase().includes(debouncedQuery.toLowerCase()))
        .map((tag) => tag.name)
    : [];

  const handleSelect = (name: string) => {
    const tag = techTags.find((tag) => tag.name === name);
    if (!tag) return;

    setSelectedIds((prev) => [...prev, tag.id]);
    setQuery('');
  };

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]));
  };

  const handleRemove = (id: string) => {
    setSelectedIds((prev) => prev.filter((sid) => sid !== id));
  };

  const selectedTags = techTags.filter((tag) => selectedIds.includes(tag.id));

  console.log(selectedIds);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="font-bold px-1">기술 스택</label>
        <SearchBox
          placeholder="기술 스택을 검색해주세요"
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
