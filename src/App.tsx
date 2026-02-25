import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BasicInfoPage from './pages/BasicInfoPage';
import TeamSetupPage from './pages/TeamSetupPage';
import TagSelectPage from './pages/TagSelectPage';
import ScheduleSetupPage from './pages/ScheduleSetupPage';
import SubmitPage from './pages/SubmitPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="wizard">
        <Route path="step-1" element={<BasicInfoPage />} />
        <Route path="step-2" element={<TeamSetupPage />} />
        <Route path="step-3" element={<TagSelectPage />} />
        <Route path="step-4" element={<ScheduleSetupPage />} />
        <Route path="step-5" element={<SubmitPage />} />
      </Route>
    </Routes>
  );
}
