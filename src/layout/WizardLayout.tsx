import { Outlet } from 'react-router-dom';

export default function WizardLayout() {
  return (
    <div className="min-h-screen max-w-lg flex flex-col items-center justify-between px-6 sm:px-16 py-10 mx-auto">
      <p>스텝 인디케이터</p>
      <Outlet />
      <p>이전/다음 버튼</p>
    </div>
  );
}
