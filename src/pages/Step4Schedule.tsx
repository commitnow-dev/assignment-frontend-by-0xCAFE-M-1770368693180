import { useState, useEffect } from "react";
import { WizardCardLayout } from "../components/WizardCardLayout";
import { useWizardStore } from "../store/useWizardStore";
import { Milestone } from "../types";
import { Calendar, Plus, Trash2, Flag } from "lucide-react";

export function Step4Schedule() {
  const { draft, setDraft, setStepValid } = useWizardStore();
  const [milestones, setMilestones] = useState<Milestone[]>(draft.milestones);
  const [dates, setDates] = useState({
    startDate: draft.startDate,
    endDate: draft.endDate,
  });

  useEffect(() => {
    const isDatesValid =
      dates.startDate && dates.endDate && dates.endDate >= dates.startDate;
    const isMilestonesValid =
      milestones.length > 0 && milestones.every((m) => m.name && m.targetDate);

    setDraft({ ...dates, milestones });
    setStepValid("step4", !!(isDatesValid && isMilestonesValid));
  }, [dates, milestones, setDraft, setStepValid]);

  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: crypto.randomUUID(),
      name: "",
      targetDate: "",
    };
    setMilestones([...milestones, newMilestone]);
  };

  const updateMilestone = (
    id: string,
    field: keyof Milestone,
    value: string
  ) => {
    setMilestones(
      milestones.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  return (
    <WizardCardLayout>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Step 4. 일정 설정
        </h2>
        <p className="mt-1 text-slate-600">
          프로젝트 기간과 주요 마일스톤을 설정하세요.
        </p>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Calendar className="h-4 w-4 text-slate-400" /> 시작일
            </label>
            <input
              type="date"
              value={dates.startDate}
              onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Calendar className="h-4 w-4 text-slate-400" /> 종료일
            </label>
            <input
              type="date"
              value={dates.endDate}
              min={dates.startDate}
              onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Flag className="h-4 w-4 text-slate-400" /> 마일스톤
            </h3>
            <button
              onClick={addMilestone}
              className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 transition-colors hover:text-indigo-700"
            >
              <Plus className="h-4 w-4" /> 추가하기
            </button>
          </div>

          <div className="space-y-3">
            {milestones.map((m) => (
              <div
                key={m.id}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/30 p-4 sm:flex-row"
              >
                <input
                  type="text"
                  placeholder="마일스톤 이름 (예: MVP 개발 완료)"
                  value={m.name}
                  onChange={(e) => updateMilestone(m.id, "name", e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={m.targetDate}
                    min={dates.startDate}
                    max={dates.endDate}
                    onChange={(e) =>
                      updateMilestone(m.id, "targetDate", e.target.value)
                    }
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                  />
                  <button
                    onClick={() => removeMilestone(m.id)}
                    className="p-2 text-slate-400 transition-colors hover:text-rose-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            {milestones.length === 0 && (
              <p className="rounded-2xl border-2 border-dashed border-slate-100 py-8 text-center text-sm italic text-slate-400">
                최소 한 개의 마일스톤이 필요합니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </WizardCardLayout>
  );
}
