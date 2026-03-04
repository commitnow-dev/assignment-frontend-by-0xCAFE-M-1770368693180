import { Outlet, useNavigate } from 'react-router-dom';
import { TOTAL_STEPS, PATH } from '@/constants';
import { Button, StepIndicator } from '@/components';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { useWizardStore } from '@/store/useWizardStore';

export default function WizardLayout() {
  const navigate = useNavigate();
  const { draft, reset } = useWizardStore();
  const { currentStep, isStepValid, handlePrev, handleNext } = useWizardNavigation();

  const handleSubmit = () => {
    console.log(draft);

    reset();
    navigate(PATH.HOME);
  };

  return (
    <div className="h-screen max-w-lg flex flex-col mx-auto">
      <div className="flex w-full justify-center py-10 bg-indigo-50">
        <StepIndicator currentStep={currentStep} />
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
