import { useLocation, useNavigate } from 'react-router-dom';
import type { WizardStep } from '@/types';
import { TOTAL_STEPS, PATH } from '@/constants';
import { useWizardStore } from '@/store/useWizardStore';

export function useWizardNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isStepValid } = useWizardStore();

  const currentStep = Number(location.pathname.split('step-')[1]) as WizardStep;

  const goToStep = (step: number) => {
    navigate(PATH.STEP(step));
  };

  const handlePrev = () => {
    if (currentStep <= 1) return;
    goToStep(currentStep - 1);
  };

  const handleNext = () => {
    if (!isStepValid(currentStep)) return;
    if (currentStep >= TOTAL_STEPS) return;
    goToStep(currentStep + 1);
  };

  return { currentStep, isStepValid, handlePrev, handleNext, goToStep };
}
