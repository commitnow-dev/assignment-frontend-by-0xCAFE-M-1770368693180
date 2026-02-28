import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import RadioOption from '@/components/RadioOption';

export default function BasicInfoPage() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col w-full gap-10">
        <Input label="프로젝트 이름" placeholder="프로젝트 이름을 입력해주세요" maxLength={50} />

        <TextArea label="프로젝트 설명" placeholder="프로젝트 설명을 입력해주세요" maxLength={500} />

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
