import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import type { WizardStep } from '@/types';
import { TOTAL_STEPS } from '@/constants';
import Button from '@/components/Button';
import { useWizardStore } from '@/store/useWizardStore';

export default function WizardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { draft, isStepValid, setStep, reset } = useWizardStore();

  const currentStep = Number(location.pathname.split('step-')[1]) as WizardStep;

  const handlePrev = () => {
    if (currentStep <= 1) return;

    const prev = (currentStep - 1) as WizardStep;
    setStep(prev);
    navigate(`/wizard/step-${prev}`);
  };

  const handleNext = () => {
    if (!isStepValid(currentStep)) return;
    if (currentStep >= TOTAL_STEPS) return;

    const next = (currentStep + 1) as WizardStep;
    setStep(next);
    navigate(`/wizard/step-${next}`);
  };

  const handleSubmit = () => {
    console.log('submit', draft);

    reset();
    navigate('/');
  };

  return (
    <div className="h-screen max-w-lg flex flex-col mx-auto">
      <div className="flex w-full justify-center py-10 bg-indigo-50">
        <p>스텝 인디케이터</p>
      </div>

      <div className="flex flex-col w-full flex-1 px-5 sm:px-12 pt-12 pb-10  overflow-hidden">
        <div className="flex-1 overflow-y-auto px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-8">
          <Outlet />
        </div>
        <div className="flex w-full justify-between gap-5">
          {currentStep === TOTAL_STEPS ? (
            <Button size="lg" onClick={handleSubmit}>
              프로젝트 생성
            </Button>
          ) : (
            <>
              <Button size="lg" isActive={currentStep > 1} onClick={handlePrev}>
                이전
              </Button>
              <Button size="lg" isActive={isStepValid(currentStep)} onClick={handleNext}>
                다음
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
