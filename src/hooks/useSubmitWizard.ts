import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createProject } from '@/api/project';
import { useWizardStore } from '@/store/useWizardStore';
import { LOADING, PATH, SUCCESS } from '@/constants';

export function useSubmitWizard() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { draft, reset } = useWizardStore();

  const handleSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    toast.promise(createProject(draft), {
      loading: LOADING.PROJECT,
      success: () => {
        reset();
        navigate(PATH.HOME);
        return SUCCESS.PROJECT;
      },
      finally: () => setIsSubmitting(false),
    });
  };

  return { isSubmitting, handleSubmit };
}
