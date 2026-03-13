import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NOTICE } from '@/constants';
import { Input, MilestoneItem } from '@/components';
import { useWizardStore } from '@/store/useWizardStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { ScheduleSchema, type ScheduleValues } from '@/schemas/wizard';

export default function ScheduleSetupPage() {
  const { draft, updateDraft } = useWizardStore();
  const { handleNext } = useWizardNavigation();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ScheduleValues>({
    resolver: zodResolver(ScheduleSchema),
    defaultValues: {
      startDate: draft.startDate,
      endDate: draft.endDate,
      milestones: draft.milestones,
    },
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const milestones = watch('milestones');

  const setMilestones = (updated: ScheduleValues['milestones']) => {
    setValue('milestones', updated, { shouldValidate: true });
    updateDraft({ milestones: updated });
  };

  const handleAddMilestone = () => {
    const updated = [...milestones, { id: crypto.randomUUID(), name: '', targetDate: '' }];
    setValue('milestones', updated);
    updateDraft({ milestones: updated });
  };

  const handleMilestoneChange = (index: number, key: 'name' | 'targetDate', value: string) => {
    setMilestones(milestones.map((m, i) => (i === index ? { ...m, [key]: value } : m)));
  };

  const handleRemoveMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const resetOutOfRangeMilestones = (newStart: string, newEnd: string) => {
    setMilestones(
      milestones.map((m) =>
        m.targetDate && (m.targetDate < newStart || m.targetDate > newEnd) ? { ...m, targetDate: '' } : m,
      ),
    );
  };

  return (
    <form
      id="wizard-step-form"
      onSubmit={handleSubmit((values) => {
        updateDraft(values);
        handleNext();
      })}
      className="flex w-full flex-col gap-7"
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label className="font-bold px-1">프로젝트 기간</label>
          <div className="flex gap-3">
            <Input
              label="시작일"
              type="date"
              value={startDate}
              max={endDate || undefined}
              onChange={(e) => {
                setValue('startDate', e.target.value, { shouldValidate: true });
                updateDraft({ startDate: e.target.value });
                resetOutOfRangeMilestones(e.target.value, endDate);
              }}
            />
            <Input
              label="종료일"
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(e) => {
                setValue('endDate', e.target.value, { shouldValidate: true });
                updateDraft({ endDate: e.target.value });
                resetOutOfRangeMilestones(startDate, e.target.value);
              }}
            />
          </div>
        </div>
        <p className="min-h-6 text-center text-red-500">{errors.endDate?.message}</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <label className="font-bold">마일스톤</label>
          <button
            type="button"
            onClick={handleAddMilestone}
            disabled={!startDate || !endDate}
            className="text-sm transition disabled:cursor-not-allowed disabled:text-gray-300 enabled:cursor-pointer enabled:text-indigo-500 enabled:hover:text-indigo-700"
          >
            + 추가
          </button>
        </div>

        {!(startDate && endDate) ? (
          <p className="px-1 text-sm text-gray-400">{NOTICE.DATE}</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {milestones.map((milestone, index) => (
              <li key={milestone.id}>
                <MilestoneItem
                  milestone={milestone}
                  minDate={startDate}
                  maxDate={endDate}
                  errorMessage={{
                    name: errors.milestones?.[index]?.name?.message,
                    targetDate: errors.milestones?.[index]?.targetDate?.message,
                  }}
                  onChange={(key, value) => handleMilestoneChange(index, key, value)}
                  onRemove={() => handleRemoveMilestone(index)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
