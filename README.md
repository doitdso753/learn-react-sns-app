# 한입 로그

---

## 기술 스택 (Tech Stack)

### Frontend
- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**  
  유틸리티 기반 CSS 프레임워크
- **Zustand**  
  전역 상태 관리 라이브러리
- **TanStack React Query**  
  서버 상태 관리 및 데이터 패칭
- **shadcn/ui**  
  Tailwind 기반의 재사용 가능한 UI 컴포넌트

### Backend
- **Supabase**  
  인증, 데이터베이스, 스토리지, 실시간 기능을 제공하는 Backend as a Service

### Infrastructure
- **Docker**
- **Docker Compose**

---

## 1. Docker 컨테이너 실행

```bash
docker compose up -d sns-app
```

## 2. Supabase 서버 실행

```bash
# 실행 중인 컨테이너 내부 접속
docker exec -it sns-app sh

# 서버 실행
npx supabase login
npx supabase init
```

---
Supabase 프로젝트는 7일간 사용하지 않을 경우 중단됩니다.
재실행 방법: Supabase 대시보드 (https://supabase.com/dashboard/org/oynghaohzdrbbiuaqadh) > 중단된 프로젝트를 클릭해 상세 페이지에 접속 > [Restore project] 버튼 클릭