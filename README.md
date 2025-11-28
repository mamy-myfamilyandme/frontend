# 🍼 Mamy - 우리가족 예방접종 관리 앱 (Frontend)

> **Jira-Github 연동 프로젝트**
> 브랜치명과 커밋 메시지에 Jira 이슈 키를 포함하여 자동 연동됩니다.

## 📋 프로젝트 개요

**핵심 기능:**
- 📷 접종증명서 OCR 자동 입력
- 📅 개인 맞춤 접종 일정 관리
- 🔔 접종 시기 알림
- 📊 접종 현황 한눈에 보기

---

## ⚡ 빠른 시작

### 1. 저장소 클론
```bash
git clone <repository-url>
cd frontend
```

### 2. 의존성 설치
```bash
npm ci
```

### 3. 앱 실행
```bash
npm start
```
📱 **실행:** Expo Go 앱에서 QR 코드 스캔

---

## 🛠️ 기술 스택

- **React Native (Expo)** + TypeScript
- **상태 관리** TBD (Redux Toolkit / Zustand)
- **React Navigation** (예정)
- **ESLint + Prettier** (코드 품질)

---

## 📂 프로젝트 구조

```
frontend/
├── src/                # 소스 코드 (예정)
│   ├── components/     # 재사용 컴포넌트
│   │   ├── common/     # Button, Input 등
│   │   └── layout/     # Header, Navigation Bar
│   ├── screens/        # 화면 컴포넌트
│   ├── navigation/     # 화면 전환
│   ├── services/       # API, OCR, 헬스킷
│   │   ├── api/        # 백엔드 API 통신
│   │   ├── ocr/        # OCR 처리
│   │   └── health/     # iOS/Android 헬스킷
│   ├── hooks/          # 커스텀 React Hook
│   ├── types/          # TypeScript 타입
│   ├── utils/          # 유틸리티 함수
│   └── constants/      # 상수 (색상, API URL)
├── assets/             # 이미지, 폰트
├── App.tsx             # 앱 진입점
├── package.json        # 의존성 관리
└── tsconfig.json       # TypeScript 설정
```

---

## 🔧 환경 설정

### 필수 도구
- **Node.js 18+**
- **npm 9+**
- **Expo Go 앱** (iOS/Android 모바일 기기에 설치)

### 선택 도구 (네이티브 빌드 시)
- **Android Studio** (Android 네이티브 개발)
- **Xcode** (iOS 네이티브 개발, macOS only)

**참고:** Expo 사용 시 Android Studio/Xcode는 필수가 아닙니다.
실제 기기에서 Expo Go 앱으로 테스트 가능합니다.

---

## 🚀 개발 워크플로우

### 🔗 Jira-Github 연동 원리

**핵심:** 브랜치명, 커밋 메시지, PR 제목에 **Jira 이슈 키(예: MAMY-123)**를 포함하면 자동으로 Jira와 연동됩니다.

---

### 1️⃣ Jira에서 브랜치 생성 (권장)

Jira 이슈 페이지에서 브랜치를 생성하면 **이슈 키가 자동으로 포함**됩니다.

**절차:**
1. Jira 이슈 페이지 오른쪽 **"Development"** 패널 클릭
2. **"Create branch"** 버튼 클릭
3. Repository 및 Base branch 선택
4. Branch name 확인 (자동으로 `MAMY-123-description` 형태 생성)
5. **Create** 클릭

**자동 생성 예시:**
```
MAMY-123-add-vaccination-screen
MAMY-124-fix-date-formatting
```

---

### 2️⃣ 수동으로 브랜치 생성하는 경우

Jira를 거치지 않고 직접 브랜치를 생성할 때는 **반드시 이슈 키를 포함**해야 합니다.

**브랜치 네이밍 컨벤션:**
```
<type>/<ISSUE-KEY>-<description>
```

**Type 분류:**
- `feature/`: 새로운 기능 개발
- `bugfix/`: 버그 수정
- `hotfix/`: 긴급 수정
- `refactor/`: 코드 리팩토링
- `docs/`: 문서 작업
- `test/`: 테스트 코드

**예시:**
```bash
# 최신 코드 받기
git switch main
git pull origin main

# 새 브랜치 생성
git switch -c feature/MAMY-123-vaccination-screen
git switch -c bugfix/MAMY-124-fix-date-format
git switch -c hotfix/MAMY-125-security-patch
git switch -c refactor/MAMY-126-optimize-api
```

---

### 3️⃣ 커밋 메시지 작성

**기본 포맷:**
```
[ISSUE-KEY] <type>: <description>
```

**Type 분류:**
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `refactor`: 코드 리팩토링
- `docs`: 문서 수정
- `test`: 테스트 추가/수정
- `chore`: 빌드, 설정 변경
- `style`: 코드 포맷팅
- `perf`: 성능 개선

**예시:**
```bash
# 1. 코드 작성 후 검사 (선택)
npm run lint           # ESLint 검사
npm run format         # Prettier 포맷팅
npm run type-check     # TypeScript 타입 검사

# 2. Git에 추가
git add .

# 3. 커밋
git commit -m "[MAMY-123] feat: 자녀 예방접종 화면 추가"
git commit -m "[MAMY-124] fix: 날짜 포맷팅 오류 수정"
git commit -m "[MAMY-125] refactor: API 호출 로직 최적화"
git commit -m "[MAMY-126] docs: API 문서 업데이트"
git commit -m "[MAMY-127] test: 화면 컴포넌트 테스트 추가"
```

**💡 팁:**
- `npm run format` 먼저 실행하면 대부분의 린트 에러 해결
- 타입 에러는 수동으로 수정 필요

---

### 4️⃣ Smart Commit으로 Jira 제어하기

커밋 메시지만으로 Jira 이슈를 업데이트할 수 있습니다.

**댓글 추가:**
```bash
git commit -m "[MAMY-123] feat: 화면 구현 완료 #comment 리뷰 요청드립니다"
```

**작업 시간 기록:**
```bash
git commit -m "[MAMY-124] fix: 버그 수정 #time 2h 30m"
```

**이슈 상태 변경:**
```bash
git commit -m "[MAMY-125] feat: 기능 완료 #done"
```

**복합 사용:**
```bash
git commit -m "[MAMY-126] feat: 알림 기능 구현 #time 3h #comment 푸시 알림 추가 완료 #done"
```

---

### 5️⃣ GitHub에 푸시

```bash
git push origin feature/MAMY-123-vaccination-screen

# 처음 푸시하는 브랜치라면
git push -u origin feature/MAMY-123-vaccination-screen
```

---

### 6️⃣ Pull Request 생성

PR 제목에도 이슈 키를 포함합니다.

**PR 제목 포맷:**
```
[MAMY-123] 자녀 예방접종 화면 구현
```

**PR 본문 예시:**
```markdown
## 📝 작업 내용
- 자녀 예방접종 기록 조회 화면 구현
- 접종 일정 캘린더 컴포넌트 추가
- API 연동 완료

## 🔗 관련 이슈
- [MAMY-123](https://your-domain.atlassian.net/browse/MAMY-123)

## ✅ 테스트
- [x] ESLint 검사 통과
- [x] TypeScript 타입 체크 통과
- [x] 화면 동작 테스트 완료

## 📸 스크린샷
(필요 시 추가)
```

---

## ✅ 연동 확인하기

### Jira 이슈에서 확인할 수 있는 정보:

1. **Development 패널**
   - 연결된 브랜치 목록
   - 커밋 히스토리
   - Pull Request 상태

2. **Activity 탭**
   - Smart Commit으로 추가한 댓글
   - 자동 기록된 작업 시간
   - 상태 변경 이력

### 체크리스트:
- [ ] Github for Jira 앱 설치 완료
- [ ] Repository 연동 완료
- [ ] 브랜치명에 이슈 키 포함 (예: `feature/MAMY-123-description`)
- [ ] 커밋 메시지에 이슈 키 포함 (예: `[MAMY-123] feat: 기능 추가`)
- [ ] PR 제목에 이슈 키 포함
- [ ] Jira 이슈의 Development 패널에서 정보 확인

---

## 🚨 주의사항

1. **이슈 키 형식**: `MAMY-123` (대문자 프로젝트 코드 + 하이픈 + 숫자)
2. **브랜치명에 반드시 이슈 키 포함**: 없으면 Jira와 연동 안 됨
3. **커밋 후 push 필요**: 커밋만 하고 push 안 하면 Jira에 표시 안 됨
4. **첫 연동 시 시간 소요**: 최초 연동은 몇 분 정도 걸릴 수 있음

---

## 📜 사용 가능한 스크립트

```bash
# 개발 서버 시작
npm start

# Android 에뮬레이터에서 실행
npm run android

# iOS 시뮬레이터에서 실행 (macOS only)
npm run ios

# 웹에서 실행
npm run web

# ESLint 검사
npm run lint

# Prettier 포맷팅
npm run format

# TypeScript 타입 체크
npm run type-check

# 테스트 실행
npm test
```

---

## 🐛 문제 해결

### 의존성 설치 실패
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Expo 캐시 문제
```bash
npm start -- --clear
```

### Metro Bundler 오류
```bash
npx react-native start --reset-cache
```

### Android 빌드 실패
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS 빌드 실패 (macOS only)
```bash
cd ios
pod install
cd ..
npm run ios
```

---

## 📋 개발 체크리스트

### 🎯 첫 설정 (처음 1번만)
- [ ] 저장소 클론 완료
- [ ] 의존성 설치 (`npm ci`)
- [ ] Expo Go 앱 설치 (모바일 기기)
- [ ] 앱 실행 확인 (`npm start`)

### 🚀 기능 개발 시
- [ ] 새 브랜치 생성
- [ ] 코드 작성
- [ ] 린팅/포맷팅 확인 (`npm run lint`, `npm run format`)
- [ ] 타입 체크 (`npm run type-check`)
- [ ] 커밋
- [ ] GitHub 푸시
- [ ] PR 생성 및 리뷰 요청

### ✅ PR 생성 전
- [ ] `git pull origin main`으로 최신 코드 반영
- [ ] 충돌 해결 완료
- [ ] 린트 검사 통과
- [ ] 타입 체크 통과
- [ ] 커밋 메시지 규칙 준수

---

## 🎯 현재 상태

- [x] 프로젝트 초기 설정 완료
- [x] TypeScript 설정 완료
- [x] ESLint + Prettier 설정 완료
- [ ] 기본 화면 구조 완성
- [ ] 네비게이션 구현
- [ ] API 연동

---

## 📞 도움이 필요할 때

**막히는 부분이 있다면:**
1. 에러 메시지 전체 복사
2. 시도한 해결 방법 정리
3. 팀 채널에 공유

**참고 문서:**
- [Expo 공식 문서](https://docs.expo.dev/)
- [React Native 공식 문서](https://reactnative.dev/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)
