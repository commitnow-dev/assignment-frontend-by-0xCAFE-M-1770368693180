export interface ReviewGroupProps {
  label: string;
  onEdit: () => void;
  children: React.ReactNode;
}

const ReviewGroup = ({ label, onEdit, children }: ReviewGroupProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b border-gray-200 py-2">
        <span className="font-semibold text-gray-700">{label}</span>
        <button type="button" onClick={onEdit} className="text-sm text-indigo-500 hover:text-indigo-700 cursor-pointer">
          수정
        </button>
      </div>
      {children}
    </div>
  );
};

export default ReviewGroup;
