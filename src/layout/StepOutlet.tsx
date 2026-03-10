import { Navigate, useParams } from 'react-router-dom';
import type { WizardStep } from '@/types';
import BasicInfoPage from '@/pages/BasicInfoPage';
import TeamSetupPage from '@/pages/TeamSetupPage';
import TagSelectPage from '@/pages/TagSelectPage';
import ScheduleSetupPage from '@/pages/ScheduleSetupPage';
import SubmitPage from '@/pages/SubmitPage';

const STEP_COMPONENTS: Record<number, React.ComponentType> = {
  1: BasicInfoPage,
  2: TeamSetupPage,
  3: TagSelectPage,
  4: ScheduleSetupPage,
  5: SubmitPage,
};

export default function StepOutlet() {
  const { step } = useParams<{ step: string }>();
  const stepNum = Number(step);

  const isValidStep = (n: number): n is WizardStep => [1, 2, 3, 4, 5].includes(n);

  if (!isValidStep(stepNum)) {
    return <Navigate to="/wizard/1" replace />;
  }

  const Page = STEP_COMPONENTS[stepNum];
  return <Page />;
}
