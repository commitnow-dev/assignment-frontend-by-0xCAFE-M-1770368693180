import { Outlet } from 'react-router-dom';
import Button from '@/components/Button';

export default function WizardLayout() {
  return (
    <div className="min-h-screen max-w-lg flex flex-col items-center mx-auto">
      <div className="flex w-full justify-center py-10 bg-indigo-100">
        <p>스텝 인디케이터</p>
      </div>

      <div className="flex flex-col w-full flex-1 justify-between px-5 sm:px-16 pt-15 pb-10">
        <Outlet />
        <div className="flex w-full justify-between gap-5">
          <Button size="lg">이전</Button>
          <Button size="lg">다음</Button>
        </div>
      </div>
    </div>
  );
}
