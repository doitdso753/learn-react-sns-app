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

### Mock Server
- **json-server**  
  JSON 파일 기반의 Mock REST API 서버

### Infrastructure
- **Docker**
- **Docker Compose**

---

## 1. Docker 컨테이너 실행

```bash
docker compose up -d sns-app
```

## 2. json-server로 Mock API 서버 실행

```bash
# 실행 중인 컨테이너 내부 접속
docker exec -it sns-app sh

# mock api 서버 실행
npx json-server server/db.json --host 0.0.0.0 --port 5200
```

