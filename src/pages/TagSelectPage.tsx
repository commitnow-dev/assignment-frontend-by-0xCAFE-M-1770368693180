import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { techTags } from '@/data/techTags';
import { PLACE_HOLDER, POPULAR_TAG_IDS } from '@/constants';
import { SearchBox, Chip, TagItem } from '@/components';
import { useDebounce } from '@/hooks/useDebounce';
import { useWizardStore } from '@/store/useWizardStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { TechSchema, type TechValues } from '@/schemas/wizard';

export default function TagSelectPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const { draft, updateDraft } = useWizardStore();
  const { handleNext } = useWizardNavigation();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TechValues>({
    resolver: zodResolver(TechSchema),
    defaultValues: { techStackIds: draft.techStackIds },
  });

  const techStackIds = watch('techStackIds');
  const popularTags = techTags.filter((t) => POPULAR_TAG_IDS.includes(t.id));

  const filtered = debouncedQuery
    ? techTags
        .filter((tag) => !techStackIds.includes(tag.id))
        .filter((tag) => tag.name.toLowerCase().includes(debouncedQuery.toLowerCase()))
        .map((tag) => tag.name)
    : [];

  const setTechIds = (updated: string[]) => {
    setValue('techStackIds', updated, { shouldValidate: true });
    updateDraft({ techStackIds: updated });
  };

  const handleSelect = (name: string) => {
    const tag = techTags.find((t) => t.name === name);
    if (!tag) return;
    setTechIds([...techStackIds, tag.id]);
    setQuery('');
  };

  const handleToggle = (id: string) => {
    setTechIds(techStackIds.includes(id) ? techStackIds.filter((sid) => sid !== id) : [...techStackIds, id]);
  };

  const selectedTags = techTags.filter((tag) => techStackIds.includes(tag.id));

  return (
    <form
      id="wizard-step-form"
      onSubmit={handleSubmit((values) => {
        updateDraft(values);
        handleNext();
      })}
      className="flex w-full flex-col gap-5"
    >
      <div className="flex flex-col gap-1">
        <label className="font-bold px-1">기술 스택</label>
        <SearchBox
          placeholder={PLACE_HOLDER.TECH}
          value={query}
          items={filtered}
          onChange={(e) => setQuery(e.target.value)}
          onSelect={handleSelect}
        />
        <p className="min-h-8 text-center text-red-500">{errors.techStackIds?.message}</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-bold px-1 text-sm text-gray-500">인기 태그</span>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => {
              const isSelected = techStackIds.includes(tag.id);
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
    </form>
  );
}
