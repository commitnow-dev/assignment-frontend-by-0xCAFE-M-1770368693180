import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PLACE_HOLDER } from '@/constants';
import { Input, TextArea, RadioOption } from '@/components';
import { useWizardStore } from '@/store/useWizardStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { BasicInfoSchema, type BasicInfoValues } from '@/schemas/wizard';

export default function BasicInfoPage() {
  const { draft, updateDraft } = useWizardStore();
  const { handleNext } = useWizardNavigation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BasicInfoValues>({
    resolver: zodResolver(BasicInfoSchema),
    mode: 'onTouched',
    defaultValues: {
      name: draft.name,
      description: draft.description,
      isPublic: draft.isPublic,
    },
  });

  const isPublic = watch('isPublic');

  return (
    <div className="flex w-full items-center justify-center">
      <form
        id="wizard-step-form"
        onSubmit={handleSubmit((values) => {
          updateDraft(values);
          handleNext();
        })}
        className="flex flex-col w-full gap-10"
      >
        <div className="flex flex-col gap-1">
          <label className="font-bold px-1">프로젝트 이름</label>
          <Input
            placeholder={PLACE_HOLDER.NAME}
            errorMessage={errors.name?.message}
            {...register('name', { onChange: (e) => updateDraft({ name: e.target.value }) })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-bold px-1">프로젝트 설명</label>
          <TextArea
            placeholder={PLACE_HOLDER.DESCRIPTION}
            errorMessage={errors.description?.message}
            {...register('description', { onChange: (e) => updateDraft({ description: e.target.value }) })}
          />
        </div>

        <div className="flex flex-col w-full gap-1">
          <label className="font-bold px-1">공개 여부</label>
          <div className="flex gap-5">
            <RadioOption
              name="visibility"
              value="public"
              checked={isPublic === true}
              onChange={() => {
                setValue('isPublic', true);
                updateDraft({ isPublic: true });
              }}
            >
              공개
            </RadioOption>
            <RadioOption
              name="visibility"
              value="private"
              checked={isPublic === false}
              onChange={() => {
                setValue('isPublic', false);
                updateDraft({ isPublic: false });
              }}
            >
              비공개
            </RadioOption>
          </div>
        </div>
      </form>
    </div>
  );
}
