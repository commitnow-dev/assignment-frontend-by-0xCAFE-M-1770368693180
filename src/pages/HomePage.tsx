import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';

export default function HomePage() {
  const navigate = useNavigate();

  const handleStartButton = () => {
    navigate('/wizard/step-1');
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Button onClick={handleStartButton}>새 프로젝트 생성</Button>
    </div>
  );
}
