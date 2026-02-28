import type { MemberRole, User } from '@/types';
import { IoIosClose } from 'react-icons/io';

export interface UserItemProps {
  user: User;
  role: MemberRole;
  onRoleChange: (role: MemberRole) => void;
  onRemove: () => void;
}

// TODO: 상수로 분리
const ROLES: MemberRole[] = ['owner', 'admin', 'member'];

const UserItem = ({ user, role, onRoleChange, onRemove }: UserItemProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-300 bg-white">
      <div className="flex flex-col">
        <span className="font-medium text-gray-800">{user.name}</span>
        <span className="text-sm text-gray-400">{user.email}</span>
      </div>
      <div className="flex items-center gap-2">
        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value as MemberRole)}
          className="text-sm border border-gray-200 rounded-lg px-2 py-1 outline-none cursor-pointer"
        >
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onRemove}
          className="text-gray-500 transition cursor-pointer"
        >
          <IoIosClose className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default UserItem;
