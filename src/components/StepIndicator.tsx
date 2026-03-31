import { useLocation, useNavigate } from "react-router-dom";

const STEPS = [
  { number: 1, label: "기본 정보" },
  { number: 2, label: "팀 구성" },
  { number: 3, label: "기술 스택" },
  { number: 4, label: "일정" },
  { number: 5, label: "확인" },
] as const;

export function StepIndicator() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // URL에서 현재 스텝 번호 추출 (/wizard/step-1 -> 1)
  const currentStep = parseInt(currentPath.split("-").pop() || "0", 10);

  if (isNaN(currentStep) || currentStep === 0) return null;

  const handleStepClick = (stepNumber: number) => {
    // 완료된 단계일 경우에만 이동 가능
    if (stepNumber < currentStep) {
      navigate(`/wizard/step-${stepNumber}`);
    }
  };

  return (
    <nav aria-label="Progress" className="mb-8">
      <ol
        role="list"
        className="flex items-center justify-between gap-2 sm:gap-4"
      >
        {STEPS.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isClickable = isCompleted;

          return (
            <li key={step.number} className="relative flex-1">
              <div className="flex flex-col items-center">
                {/* Step Item (Button for accessibility if clickable) */}
                <button
                  type="button"
                  onClick={() => handleStepClick(step.number)}
                  disabled={!isClickable}
                  className={`group relative z-10 flex flex-col items-center focus:outline-none ${
                    isClickable ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                      isCompleted
                        ? "border-indigo-600 bg-indigo-600 text-white group-hover:bg-indigo-700"
                        : isCurrent
                          ? "border-indigo-600 bg-white text-indigo-600"
                          : "border-slate-300 bg-white text-slate-400"
                    }`}
                  >
                    {isCompleted ? <CheckIcon /> : step.number}
                  </span>
                  <span
                    className={`mt-2 hidden text-[10px] font-semibold transition-colors sm:block ${
                      isCurrent
                        ? "text-indigo-600"
                        : isClickable
                          ? "text-slate-600 group-hover:text-indigo-600"
                          : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </button>

                {/* Connecting Line */}
                {step.number !== STEPS.length && (
                  <div
                    className="absolute left-[calc(50%+1rem)] top-4 hidden h-0.5 w-[calc(100%-2rem)] sm:block"
                    aria-hidden="true"
                  >
                    <div
                      className={`h-full transition-all duration-500 ${
                        isCompleted ? "bg-indigo-600" : "bg-slate-200"
                      }`}
                    />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 text-white"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.176a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}
