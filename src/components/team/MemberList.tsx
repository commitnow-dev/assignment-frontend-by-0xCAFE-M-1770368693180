import { User, MemberRole } from "../../types";
import { Select } from "radix-ui";
import { X, ChevronDown, Check } from "lucide-react";

interface MemberListProps {
  members: (User & { role: MemberRole })[];
  onUpdateRole: (id: string, role: MemberRole) => void;
  onRemove: (id: string) => void;
}

const ROLES: { value: MemberRole; label: string }[] = [
  { value: "owner", label: "소유자" },
  { value: "admin", label: "관리자" },
  { value: "member", label: "멤버" },
];

export function MemberList({
  members,
  onUpdateRole,
  onRemove,
}: MemberListProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
        참여 멤버 ({members.length})
      </h3>
      <div className="space-y-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white shadow-inner">
                {member.name[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{member.name}</p>
                <p className="text-xs text-slate-500">{member.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Select.Root
                value={member.role}
                onValueChange={(val) => onUpdateRole(member.id, val as MemberRole)}
              >
                <Select.Trigger className="flex h-9 items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 focus:outline-none">
                  <Select.Value />
                  <Select.Icon>
                    <ChevronDown className="h-3 w-3 text-slate-400" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="z-50 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl animate-in fade-in zoom-in-95">
                    <Select.Viewport className="p-1">
                      {ROLES.map((role) => (
                        <Select.Item
                          key={role.value}
                          value={role.value}
                          className="relative flex cursor-default select-none items-center rounded-md py-2 pl-8 pr-4 text-xs font-medium text-slate-700 outline-none hover:bg-indigo-50 hover:text-indigo-700 focus:bg-indigo-50 focus:text-indigo-700 data-[state=checked]:text-indigo-700"
                        >
                          <Select.ItemText>{role.label}</Select.ItemText>
                          <Select.ItemIndicator className="absolute left-2 flex items-center justify-center">
                            <Check className="h-3 w-3" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>

              <button
                onClick={() => onRemove(member.id)}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {members.length === 0 && (
          <p className="rounded-2xl border-2 border-dashed border-slate-100 py-10 text-center text-sm text-slate-400 italic">
            아직 팀원이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
