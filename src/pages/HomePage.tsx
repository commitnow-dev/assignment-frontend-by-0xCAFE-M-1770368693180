import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { PATH } from '@/constants';

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
