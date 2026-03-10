import { Fragment } from 'react';
import clsx from 'clsx';
import type { WizardStep } from '@/types';
import { WIZARD_STEPS } from '@/constants';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';

export interface StepIndicatorProps {
  currentStep: WizardStep;
}

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const { isStepValid, goToStep } = useWizardNavigation();

  return (
    <div className="flex w-full items-start px-6">
      {WIZARD_STEPS.map(({ step, label }, index) => {
        const isCompleted = step < currentStep && isStepValid(step);
        const isCurrent = step === currentStep;

        return (
          <Fragment key={step}>
            <div className="flex flex-col items-center gap-1">
              {isCompleted ? (
                <button
                  type="button"
                  onClick={() => goToStep(step)}
                  aria-label={`${label} 단계로 이동`}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all bg-indigo-500 text-white cursor-pointer hover:bg-indigo-600"
                >
                  ✓
                </button>
              ) : (
                <div
                  aria-current={isCurrent ? 'step' : undefined}
                  className={clsx(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    isCurrent ? 'bg-indigo-500 text-white ring-4 ring-indigo-200' : 'bg-gray-200 text-gray-400',
                  )}
                >
                  {step}
                </div>
              )}

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
