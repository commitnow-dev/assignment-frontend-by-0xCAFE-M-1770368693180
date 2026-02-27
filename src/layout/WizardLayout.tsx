import { Outlet } from 'react-router-dom';

export default function WizardLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-10">
      <p>스텝 인디케이터</p>
      <Outlet />
      <p>이전/다음 버튼</p>
    </div>
  );
}
