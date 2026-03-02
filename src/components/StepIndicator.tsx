import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import type { WizardStep } from '@/types';
import { WIZARD_STEPS } from '@/constants';
import { useWizardStore } from '@/store/useWizardStore';

export interface StepIndicatorProps {
  currentStep: WizardStep;
}

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const { isStepValid, setStep } = useWizardStore();
  const navigate = useNavigate();

  const goToStep = (step: WizardStep) => {
    setStep(step);
    navigate(`/wizard/step-${step}`);
  };

  return (
    <div className="flex w-full items-start px-6">
      {WIZARD_STEPS.map(({ step, label }, index) => {
        const isCompleted = step < currentStep && isStepValid(step);
        const isCurrent = step === currentStep;

        const handleClick = () => {
          if (!isCompleted) return;
          goToStep(step);
        };

        return (
          <Fragment key={step}>
            <div className="flex flex-col items-center gap-1">
              <div
                onClick={handleClick}
                className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                  isCompleted && 'bg-indigo-500 text-white cursor-pointer hover:bg-indigo-600',
                  isCurrent && 'bg-indigo-500 text-white ring-4 ring-indigo-200',
                  !isCompleted && !isCurrent && 'bg-gray-200 text-gray-400',
                )}
              >
                {isCompleted ? '✓' : step}
              </div>
              <span
                className={clsx(
                  'text-xs whitespace-nowrap',
                  isCurrent && 'text-indigo-600 font-semibold',
                  isCompleted && 'text-indigo-400',
                  !isCompleted && !isCurrent && 'text-gray-400',
                )}
              >
                {label}
              </span>
            </div>

            {index < WIZARD_STEPS.length - 1 && (
              <div className={clsx('flex-1 h-0.5 mt-4 mx-1', isCompleted ? 'bg-indigo-400' : 'bg-gray-200')} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
