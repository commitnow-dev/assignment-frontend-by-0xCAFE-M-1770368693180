import { useNavigate } from "react-router-dom";
import { WizardCardLayout } from "../components/WizardCardLayout";

export function Home() {
  const navigate = useNavigate();

  return (
    <WizardCardLayout>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        프로젝트 대시보드
      </h1>
      <button
        type="button"
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:bg-indigo-300"
        onClick={() => navigate("/wizard/step-1")}
      >
        새 프로젝트 만들기
      </button>
    </WizardCardLayout>
  );
}
