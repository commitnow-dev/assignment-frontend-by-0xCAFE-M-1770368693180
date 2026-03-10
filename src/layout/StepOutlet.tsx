import { Navigate } from 'react-router-dom';
import type { WizardStep } from '@/types';
import { PATH } from '@/constants';
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
  const firstInvalidStep = ([1, 2, 3, 4] as WizardStep[]).slice(0, currentStep - 1).find((s) => !isStepValid(s));

  if (!isValidStep(currentStep)) {
    return <Navigate to="/wizard/1" replace />;
  }

  if (firstInvalidStep !== undefined) {
    return <Navigate to={PATH.STEP(firstInvalidStep)} replace />;
  }

  const Page = STEP_COMPONENTS[currentStep];
  return <Page />;
}
