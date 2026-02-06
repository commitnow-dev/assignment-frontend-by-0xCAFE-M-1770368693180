
# 프로젝트 생성 위자드 (멀티스텝 폼)

## ✏️ 과제의 개요

| 카테고리 | 난이도 | 제한시간 |
|----------|--------|----------|
| frontend | normal | 7d |

### 💻 과제에서 요구하는 개발언어

- react
- typescript


## 📜 과제의 내용

> 과제 설명과 요구사항을 참고하여, 구현해 주세요.

### 👀 과제의 설명

## 프로젝트 생성 위자드 (멀티스텝 폼)

### 과제 가이드

**개요**

* 프로젝트 생성 위자드의 핵심 흐름을 기본 정보 → 팀 구성 → 기술 스택 → 일정 → 확인/생성까지 5단계 멀티스텝 폼으로 구현합니다.
* 상태관리 도구나 폼 라이브러리는 자유 선택이며, 요구사항은 "무엇이 구현되었는지"만 체크할 수 있도록 설계했습니다.

***

### 사용자 시나리오

1. 사용자는 "새 프로젝트 만들기" 버튼을 클릭해 위자드를 시작한다.
2. **Step 1**에서 프로젝트 이름, 설명, 공개 여부를 입력한다.
3. **Step 2**에서 팀원을 검색하고 추가하며, 각 멤버에게 역할(owner/admin/member)을 지정한다.
4. **Step 3**에서 기술 스택 태그를 검색/선택하거나 인기 태그를 클릭해 추가한다.
5. **Step 4**에서 시작일/종료일을 선택하고, 마일스톤을 추가한다.
6. **Step 5**에서 전체 입력 요약을 확인하고, 수정이 필요하면 해당 단계로 이동한다.
7. "프로젝트 생성" 버튼을 눌러 제출을 완료하고 성공 메시지를 확인한다.
8. 브라우저를 새로고침해도 입력 중인 데이터가 복원된다.

***

### 필요한 화면

| 단계     | 경로               | 핵심 요소                                         |
| ------ | ---------------- | --------------------------------------------- |
| Step 1 | `/wizard/step-1` | 프로젝트 이름(필수, 3\~50자), 설명(선택, 500자), 공개/비공개 토글  |
| Step 2 | `/wizard/step-2` | 팀원 검색(디바운스), 검색 결과에서 선택→목록 추가, 역할 드롭다운, 멤버 삭제 |
| Step 3 | `/wizard/step-3` | 태그 자동완성 입력, 인기 태그 버튼, 선택된 태그 목록(삭제 가능)        |
| Step 4 | `/wizard/step-4` | 시작일/종료일 Date Picker, 마일스톤 동적 추가/삭제(이름, 목표 날짜) |
| Step 5 | `/wizard/step-5` | 전체 요약 표시, 각 섹션 옆 "수정" 링크, "프로젝트 생성" 버튼        |

공통: 스텝 인디케이터(현재/완료/미완료 상태), 이전/다음 버튼, 로딩·에러 토스트

***

### 데이터 인터페이스 및 예시

```typescript
// types.ts
export type MemberRole = 'owner' | 'admin' | 'member';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface TeamMember {
  userId: string;
  role: MemberRole;
}

export interface TechTag {
  id: string;
  name: string;
  category: string;
}

export interface Milestone {
  id: string;
  name: string;
  targetDate: string; // YYYY-MM-DD
}

export interface ProjectDraft {
  name: string;
  description: string;
  isPublic: boolean;
  teamMembers: TeamMember[];
  techStackIds: string[];
  startDate: string;
  endDate: string;
  milestones: Milestone[];
}

export interface StepValidation {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
}

export interface WizardState {
  currentStep: number; // 1-5
  draft: ProjectDraft;
  validation: StepValidation;
  lastSavedAt?: string;
}
```

```json
// users.json (검색용 예시)
[
  { "id": "u_001", "name": "김개발", "email": "kim@example.com", "avatarUrl": "/avatars/kim.png" },
  { "id": "u_002", "name": "이디자인", "email": "lee@example.com", "avatarUrl": "/avatars/lee.png" },
  { "id": "u_003", "name": "박기획", "email": "park@example.com" }
]
```

```json
// tech-tags.json (예시)
[
  { "id": "react", "name": "React", "category": "frontend" },
  { "id": "typescript", "name": "TypeScript", "category": "language" },
  { "id": "nextjs", "name": "Next.js", "category": "framework" },
  { "id": "tailwind", "name": "Tailwind CSS", "category": "styling" },
  { "id": "nodejs", "name": "Node.js", "category": "backend" }
]
```

```json
// project.request.example.json (최종 제출 형태)
{
  "name": "커밋나우 v2",
  "description": "코드 리뷰 플랫폼 리뉴얼",
  "isPublic": true,
  "teamMembers": [
    { "userId": "u_001", "role": "owner" },
    { "userId": "u_002", "role": "member" }
  ],
  "techStackIds": ["react", "typescript", "nextjs"],
  "startDate": "2025-02-01",
  "endDate": "2025-04-30",
  "milestones": [
    { "id": "m1", "name": "MVP 완료", "targetDate": "2025-03-15" },
    { "id": "m2", "name": "베타 출시", "targetDate": "2025-04-15" }
  ]
}
```

​


### 🎯 과제의 요구사항

- 스텝 인디케이터: 현재/완료/미완료 단계가 시각적으로    구분되고, 완료된 단계 클릭 시 해당 단계로 이동한다.
- Step 1 (기본 정보): 프로젝트 이름 필수 검증(3~50자),    설명 500자 제한, 공개/비공개 토글이 동작한다.
- Step 2 (팀 구성): 팀원 검색 시 디바운스가 적용되고,   선택한 멤버가 목록에 추가되며, 역할 변경/삭제가   가능하다.
- Step 3 (기술 스택): 태그 자동완성 검색이 동작하고,   인기 태그 클릭 시 바로 추가되며, 선택된 태그 삭제가   가능하다.
- Step 4 (일정): 시작일/종료일 선택 시 종료일 ≥ 시작    검증이 동작하고, 마일스톤 추가/삭제가 가능하다.   6. Step 5 (확인): 모든 입력이 요약 형태로 표시되고, 각   섹션 "수정" 클릭 시 해당 단계로 이동한다.
- Step 5 (확인): 모든 입력이 요약 형태로 표시되고, 각   섹션 "수정" 클릭 시 해당 단계로 이동한다.
- 단계 이동: 이전/다음 버튼으로 이동 시 입력값이   유지되고, 필수값 미입력 시 다음 단계 진행이 차단된다.
- 자동 저장: 입력 변경 시 localStorage에 자동   저장되고, 새로고침 시 복원된다.
- 폼 제출: "프로젝트 생성" 클릭 시 콘솔 출력 또는 mock    API 호출로 최종 데이터를 확인할 수 있다.
