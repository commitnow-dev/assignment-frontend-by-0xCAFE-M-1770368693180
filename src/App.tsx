import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Step1BasicInfo } from "./pages/Step1BasicInfo";
import { Step2Team } from "./pages/Step2Team";
import { Step3TechStack } from "./pages/Step3TechStack";
import { Step4Schedule } from "./pages/Step4Schedule";
import { Step5Confirm } from "./pages/Step5Confirm";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wizard/step-1" element={<Step1BasicInfo />} />
        <Route path="/wizard/step-2" element={<Step2Team />} />
        <Route path="/wizard/step-3" element={<Step3TechStack />} />
        <Route path="/wizard/step-4" element={<Step4Schedule />} />
        <Route path="/wizard/step-5" element={<Step5Confirm />} />
      </Routes>
    </BrowserRouter>
  );
}
