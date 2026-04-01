import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StepIndicator } from "./StepIndicator";
import { useWizardStore } from "../store/useWizardStore";
import { StepValidation } from "../types";

export function WizardCardLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
const { validation, draft, reset } = useWizardStore();

// Determine current step from URL path (e.g., /wizard/step-1 -> 1)
const currentStep = parseInt(currentPath.split("-").pop() || "0", 10);
const isWizardStep = !isNaN(currentStep) && currentStep > 0;

// Check if current step is valid
const currentStepKey = `step${currentStep}` as keyof StepValidation;
const isCurrentStepValid = currentStep === 5 || validation[currentStepKey];

const handleNext = () => {
  if (!isCurrentStepValid) return;

  if (currentStep < 5) {
    navigate(`/wizard/step-${currentStep + 1}`);
  } else {
    // Final step: Log data and reset
    console.log("=== Project Created Successfully ===");
    console.log(JSON.stringify(draft, null, 2));
    alert("프로젝트가 생성되었습니다! 콘솔에서 데이터를 확인하세요.");
    reset();
    navigate("/");
  }
};


  const handleBack = () => {
    if (currentStep > 1) {
      navigate(`/wizard/step-${currentStep - 1}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
        {isWizardStep && <StepIndicator />}
        {children}

        {isWizardStep && (
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              이전
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!isCurrentStepValid}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
              {currentStep === 5 ? "프로젝트 생성" : "다음"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

