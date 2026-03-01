import { Outlet } from 'react-router-dom';
import Button from '@/components/Button';

export default function WizardLayout() {
  return (
    <div className="min-h-screen max-w-lg flex flex-col items-center justify-between px-6 sm:px-16 py-10 mx-auto">
      <p>스텝 인디케이터</p>
      <Outlet />
      <div className="flex w-full justify-between gap-5">
        <Button size="lg">이전</Button>
        <Button size="lg">다음</Button>
      </div>
    </div>
  );
}
