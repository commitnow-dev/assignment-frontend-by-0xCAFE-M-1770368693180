import { PLACE_HOLDER } from '@/constants';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import RadioOption from '@/components/RadioOption';

export default function BasicInfoPage() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col w-full gap-10">
        <div className="flex flex-col gap-1">
          <label className="font-bold px-1">프로젝트 이름</label>
          <Input placeholder={PLACE_HOLDER.NAME} maxLength={50} />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-bold px-1">프로젝트 설명</label>
          <TextArea placeholder={PLACE_HOLDER.DESCRIPTION} maxLength={500} />
        </div>

        <div className="flex flex-col w-full gap-1">
          <label className="font-bold px-1">공개 여부</label>
          <div className="flex gap-5">
            <RadioOption name="visibility" value="isPublic" checked>
              공개
            </RadioOption>
            <RadioOption name="visibility" value="isPrivate" checked={false}>
              비공개
            </RadioOption>
          </div>
        </div>
      </div>
    </div>
  );
}
