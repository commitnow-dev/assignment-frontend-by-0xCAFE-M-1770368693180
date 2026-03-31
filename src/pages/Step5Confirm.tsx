import { WizardCardLayout } from "../components/WizardCardLayout";
import { useWizardStore } from "../store/useWizardStore";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { User } from "../types";
import {
  Edit2,
  Users,
  Code,
  Calendar as CalendarIcon,
  CheckCircle2,
} from "lucide-react";

export function Step5Confirm() {
  const { draft } = useWizardStore();
  const navigate = useNavigate();
  const [memberNames, setMemberNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      if (draft.teamMembers.length > 0) {
        try {
          const response = await fetch("/data/users.json");
          const allUsers: User[] = await response.json();
          const names = draft.teamMembers
            .map((tm) => allUsers.find((u) => u.id === tm.userId)?.name)
            .filter((n): n is string => !!n);
          setMemberNames(names);
        } catch (error) {
          console.error("Failed to fetch member details:", error);
        }
      }
    };
    fetchMemberDetails();
  }, [draft.teamMembers]);

  const SummarySection = ({
    title,
    icon: Icon,
    path,
    children,
  }: {
    title: string;
    icon: any;
    path: string;
    children: React.ReactNode;
  }) => (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/30 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <Icon className="h-4 w-4 text-indigo-500" /> {title}
        </div>
        <button
          onClick={() => navigate(path)}
          className="flex items-center gap-1 text-xs font-bold text-slate-400 transition-colors hover:text-indigo-600"
        >
          <Edit2 className="h-3 w-3" /> 수정
        </button>
      </div>
      {children}
    </div>
  );

  return (
    <WizardCardLayout>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Step 5. 최종 확인
        </h2>
        <p className="mt-1 text-slate-600">
          입력하신 정보를 확인하고 프로젝트를 생성하세요.
        </p>
      </div>

      <div className="space-y-4">
        <SummarySection
          title="기본 정보"
          icon={CheckCircle2}
          path="/wizard/step-1"
        >
          <div className="space-y-2">
            <p className="text-sm font-bold text-slate-900">{draft.name}</p>
            <p className="line-clamp-2 text-sm text-slate-500">
              {draft.description}
            </p>
            <span
              className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                draft.isPublic
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {draft.isPublic ? "공개 프로젝트" : "비공개 프로젝트"}
            </span>
          </div>
        </SummarySection>

        <SummarySection title="팀 구성" icon={Users} path="/wizard/step-2">
          <div className="flex flex-wrap gap-2">
            {memberNames.length > 0 ? (
              memberNames.map((name, i) => (
                <span
                  key={i}
                  className="rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {name}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-400 italic">
                선택된 팀원이 없습니다.
              </p>
            )}
          </div>
        </SummarySection>

        <SummarySection title="기술 스택" icon={Code} path="/wizard/step-3">
          <div className="flex flex-wrap gap-1.5">
            {draft.techStackIds.length > 0 ? (
              draft.techStackIds.map((id) => (
                <span
                  key={id}
                  className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-600"
                >
                  #{id}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-400 italic">
                선택된 기술이 없습니다.
              </p>
            )}
          </div>
        </SummarySection>

        <SummarySection
          title="일정 및 마일스톤"
          icon={CalendarIcon}
          path="/wizard/step-4"
        >
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-600">
              {draft.startDate || "미설정"} ~ {draft.endDate || "미설정"}
            </p>
            <div className="space-y-2">
              {draft.milestones.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-white p-2 text-xs"
                >
                  <span className="font-medium text-slate-700">{m.name}</span>
                  <span className="text-slate-400">{m.targetDate}</span>
                </div>
              ))}
            </div>
          </div>
        </SummarySection>
      </div>
    </WizardCardLayout>
  );
}
