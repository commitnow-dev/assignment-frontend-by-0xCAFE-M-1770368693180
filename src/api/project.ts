import type { ProjectDraft } from '@/types';

// mock api
export const createProject = (draft: ProjectDraft): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(draft);
      resolve();
    }, 1000);
  });
};
