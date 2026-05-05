# AI Small Project Platform MVP

기업 실무 프로젝트를 소규모로 쪼개 청년들에게 배분하고, AI가 결과물을 검수 및 교육하는 플랫폼입니다.

## 프로젝트 구조

- `backend`: Node.js, Express, TypeScript, OpenAI API
- `frontend`: React, Vite, TypeScript, Vanilla CSS

## 시작하기

### 1. Backend 설정

```bash
cd backend
npm install
cp .env.example .env # OpenAI API 키를 설정하세요 (없어도 Mock 응답 제공)
npm run dev
```

### 2. Frontend 설정

```bash
cd frontend
npm install
npm run dev
```

## 주요 기능

1. **프로젝트 브라우징**: 기업이 등록한 소규모 프로젝트 리스트 확인.
2. **결과물 제출**: 사용자가 실무 과제를 수행 후 결과물(텍스트/코드) 제출.
3. **AI 검수 및 교육**: OpenAI GPT-4를 활용하여 점수 산출, 상세 피드백, 교육적 조언 제공.
