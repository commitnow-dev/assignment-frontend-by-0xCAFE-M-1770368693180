import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import WizardLayout from '@/layout/WizardLayout';
import StepOutlet from '@/layout/StepOutlet';
import HomePage from '@/pages/HomePage';

export default function App() {
  return (
    <>
      <Toaster position="top-center" richColors />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="wizard" element={<WizardLayout />}>
          <Route index element={<Navigate to="1" replace />} />
          <Route path=":step" element={<StepOutlet />} />
        </Route>
      </Routes>
    </>
  );
}
