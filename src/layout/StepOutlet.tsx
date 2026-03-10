import { Navigate } from 'react-router-dom';
import type { WizardStep } from '@/types';
import { PATH, WIZARD_STEPS } from '@/constants';
import BasicInfoPage from '@/pages/BasicInfoPage';
import TeamSetupPage from '@/pages/TeamSetupPage';
import TagSelectPage from '@/pages/TagSelectPage';
import ScheduleSetupPage from '@/pages/ScheduleSetupPage';
import SubmitPage from '@/pages/SubmitPage';
import { useWizardStore } from '@/store/useWizardStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';

const STEP_COMPONENTS: Record<number, React.ComponentType> = {
  1: BasicInfoPage,
  2: TeamSetupPage,
  3: TagSelectPage,
  4: ScheduleSetupPage,
  5: SubmitPage,
};

export default function StepOutlet() {
  const { currentStep } = useWizardNavigation();

  const { isStepValid } = useWizardStore();
  const isValidStep = (n: number): n is WizardStep => [1, 2, 3, 4, 5].includes(n);
  const firstInvalidStep = WIZARD_STEPS.map(({ step }) => step)
    .slice(0, currentStep - 1)
    .find((step) => !isStepValid(step));

  if (!isValidStep(currentStep)) {
    return <Navigate to="/wizard/1" replace />;
  }

  if (firstInvalidStep !== undefined) {
    return <Navigate to={PATH.STEP(firstInvalidStep)} replace />;
  }

  const Page = STEP_COMPONENTS[currentStep];
  return <Page />;
}
