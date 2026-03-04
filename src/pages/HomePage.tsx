import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants';
import { Button } from '@/components';

export default function HomePage() {
  const navigate = useNavigate();

  const handleStartButton = () => {
    navigate(PATH.STEP(1));
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Button onClick={handleStartButton}>새 프로젝트 생성</Button>
    </div>
  );
}
