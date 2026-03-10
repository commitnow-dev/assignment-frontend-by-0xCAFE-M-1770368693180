import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { TOTAL_STEPS } from '@/constants';
import { Button, StepIndicator } from '@/components';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { useWizardStore } from '@/store/useWizardStore';
import { useSubmitWizard } from '@/hooks/useSubmitWizard';

export default function WizardLayout() {
  const contentRef = useRef<HTMLDivElement>(null);

  const { isStepValid } = useWizardStore();
  const { currentStep, handlePrev, handleNext } = useWizardNavigation();
  const { handleSubmit } = useSubmitWizard();

  useEffect(() => {
    contentRef.current?.focus();
  }, [currentStep]);

  return (
    <div className="h-screen max-w-lg flex flex-col mx-auto">
      <div className="flex w-full justify-center py-10 bg-indigo-50">
        <StepIndicator currentStep={currentStep} />
      </div>

      <div className="flex flex-col w-full flex-1 px-5 sm:px-12 pt-12 pb-10  overflow-hidden">
        <div
          ref={contentRef}
          tabIndex={-1}
          aria-label={`${currentStep}단계 콘텐츠`}
          className="flex-1 overflow-y-auto px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-8"
        >
          <Outlet />
        </div>
        <div className="flex w-full justify-between gap-5">
          {currentStep === TOTAL_STEPS ? (
            <>
              <Button size="lg" isActive={currentStep > 1} onClick={handlePrev}>
                이전
              </Button>
              <Button size="lg" onClick={handleSubmit}>
                프로젝트 생성
              </Button>
            </>
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
