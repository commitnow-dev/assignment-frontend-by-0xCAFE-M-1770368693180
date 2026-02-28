import Input from '@/components/Input';
import TextArea from '@/components/TextArea';

export default function BasicInfoPage() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col w-full gap-10">
        <Input label="프로젝트 이름" placeholder="프로젝트 이름을 입력해주세요" maxLength={50} />
        <TextArea label="프로젝트 설명" placeholder="프로젝트 설명을 입력해주세요" maxLength={500} />
      </div>
    </div>
  );
}
