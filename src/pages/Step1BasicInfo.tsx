import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { WizardCardLayout } from "../components/WizardCardLayout";
import { Switch } from "radix-ui";
import { useWizardStore } from "../store/useWizardStore";
import { useEffect, useRef } from "react";

const step1Schema = z.object({
  name: z
    .string()
    .min(3, "프로젝트 이름은 3자 이상이어야 합니다.")
    .max(50, "프로젝트 이름은 50자 이내여야 합니다."),
  description: z
    .string()
    .max(500, "설명은 500자 이내여야 합니다.")
    .optional()
    .or(z.literal("")),
  isPublic: z.boolean(),
});

type Step1Data = z.infer<typeof step1Schema>;

export function Step1BasicInfo() {
  const setDraft = useWizardStore((state) => state.setDraft);
  const setStepValid = useWizardStore((state) => state.setStepValid);
  const initialDraft = useRef(useWizardStore.getState().draft).current;

  const {
    register,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    mode: "onChange",
    defaultValues: {
      name: initialDraft.name,
      description: initialDraft.description,
      isPublic: initialDraft.isPublic,
    },
  });

  const formData = watch();

  useEffect(() => {
    setDraft(formData);
    setStepValid("step1", isValid);
  }, [
    formData.name,
    formData.description,
    formData.isPublic,
    isValid,
    setDraft,
    setStepValid,
  ]);

  return (
    <WizardCardLayout>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Step 1. 기본 정보
        </h2>
        <p className="mt-1 text-slate-600">
          프로젝트의 핵심 정보를 입력하여 시작해 보세요.
        </p>
      </div>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-slate-700"
            >
              프로젝트 이름 <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="3~50자 이내"
              {...register("name")}
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm transition-all focus:ring-4 focus:outline-none ${
                errors.name
                  ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/10"
                  : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10"
              }`}
            />
            {errors.name && (
              <p className="text-xs font-medium text-rose-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm font-semibold text-slate-700"
            >
              프로젝트 설명
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="500자 이내 (선택 사항)"
              {...register("description")}
              className={`w-full resize-none rounded-xl border bg-white px-4 py-2.5 text-sm transition-all focus:ring-4 focus:outline-none ${
                errors.description
                  ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/10"
                  : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10"
              }`}
            />
            {errors.description && (
              <p className="text-xs font-medium text-rose-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:bg-slate-50">
            <div className="flex flex-col gap-0.5">
              <label
                htmlFor="isPublic"
                className="text-sm font-semibold text-slate-900"
              >
                프로젝트 공개 여부
              </label>
              <p className="text-xs text-slate-500">
                공개 설정 시 다른 사용자가 프로젝트를 검색하고 볼 수 있습니다.
              </p>
            </div>
            <Controller
              name="isPublic"
              control={control}
              render={({ field }) => (
                <Switch.Root
                  id="isPublic"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="relative h-6 w-11 cursor-default rounded-full bg-slate-300 transition-colors focus:outline-none data-[state=checked]:bg-indigo-600"
                >
                  <Switch.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              )}
            />
          </div>
        </div>
      </form>
    </WizardCardLayout>
  );
}
