import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import type { WizardStep } from '@/types';
import Button from '@/components/Button';
import { useWizardStore } from '@/store/useWizardStore';

const TOTAL_STEPS = 5;

export default function WizardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isStepValid, setStep } = useWizardStore();

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

  return (
    <div className="min-h-screen max-w-lg flex flex-col items-center mx-auto">
      <div className="flex w-full justify-center py-10 bg-indigo-100">
        <p>스텝 인디케이터</p>
      </div>

      <div className="flex flex-col w-full flex-1 justify-between px-5 sm:px-16 pt-15 pb-10">
        <Outlet />
        <div className="flex w-full justify-between gap-5">
          <Button size="lg" isActive={currentStep > 1} onClick={handlePrev}>
            이전
          </Button>
          <Button size="lg" isActive={isStepValid(currentStep)} onClick={handleNext}>
            {currentStep === 5 ? '생성' : '다음'}
          </Button>
        </div>
      </div>
    </div>
  );
}
