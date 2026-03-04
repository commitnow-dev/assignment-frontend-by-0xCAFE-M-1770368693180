import { useState } from 'react';
import { PLACE_HOLDER } from '@/constants';
import { validateName, validateDescription } from '@/utils/validate';
import { Input, TextArea, RadioOption } from '@/components';
import { useWizardStore } from '@/store/useWizardStore';

export default function BasicInfoPage() {
  const { draft, updateDraft } = useWizardStore();
  const [nameTouched, setNameTouched] = useState(false);

  const nameValidation = validateName(draft.name);
  const descriptionValidation = validateDescription(draft.description);

  const nameError = nameTouched && !nameValidation.isValid ? nameValidation.message : undefined;
  const descriptionError = !descriptionValidation.isValid ? descriptionValidation.message : undefined;

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col w-full gap-10">
        <div className="flex flex-col gap-1">
          <label className="font-bold px-1">프로젝트 이름</label>
          <Input
            placeholder={PLACE_HOLDER.NAME}
            value={draft.name}
            onChange={e => updateDraft({ name: e.target.value })}
            onBlur={() => setNameTouched(true)}
            errorMessage={nameError}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-bold px-1">프로젝트 설명</label>
          <TextArea
            placeholder={PLACE_HOLDER.DESCRIPTION}
            value={draft.description}
            onChange={e => updateDraft({ description: e.target.value })}
            errorMessage={descriptionError}
          />
        </div>

        <div className="flex flex-col w-full gap-1">
          <label className="font-bold px-1">공개 여부</label>
          <div className="flex gap-5">
            <RadioOption
              name="visibility"
              value="public"
              checked={draft.isPublic}
              onChange={() => updateDraft({ isPublic: true })}
            >
              공개
            </RadioOption>
            <RadioOption
              name="visibility"
              value="private"
              checked={!draft.isPublic}
              onChange={() => updateDraft({ isPublic: false })}
            >
              비공개
            </RadioOption>
          </div>
        </div>
      </div>
    </div>
  );
}
