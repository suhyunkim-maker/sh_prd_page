# 🏨 SH호텔 로봇 자동화 서비스 차세대 UI/UX 설계안 (sh_prd_page)

본 프로젝트는 구글의 AI-native 디자인 프로토타이핑 캔버스인 **Stitch (Design with AI)**를 기반으로 김수현 PM이 기획하고, **Vercel**에 완벽하게 불변형 정적 단독 호스팅으로 안전하게 배포 완료한 스마트 호텔 서비스 프론트엔드 설계 사양서입니다.

---

## 🚀 실시간 배포 및 실시간 프리뷰 주소
*   **💻 PC 통합 관제 대시보드 배포판 (Vercel Live)**: 
    👉 **[https://next-extension-blond.vercel.app/index.html](https://next-extension-blond.vercel.app/index.html)**
*   **📱 모바일용 로봇 가이드 실시간 프리뷰 (Stitch Live)**: 
    👉 **[https://stitch.withgoogle.com/preview/16393579884020231280?node-id=3c31bbbc06ec4d4e87c08691c1d39d48](https://stitch.withgoogle.com/preview/16393579884020231280?node-id=3c31bbbc06ec4d4e87c08691c1d39d48)**

---

## 🎨 제공 및 연동 완료된 인터랙티브 스크린 3종
배포된 PC 버전 웹서비스 하단의 골드/네이비 글래스모피즘 플로팅 메뉴바를 통해 아래의 스크린들을 넘나들며 테스트하실 수 있습니다:

1.  **📊 Dashboard** (`/index.html`): 호텔 F&B 및 투숙객 로봇 가이드 통합 제어를 위한 데스크톱용 풀 스펙 대시보드.
2.  **🛠️ Setup** (`/setup.html`): 각 미팅 부서, 참석자 정보 및 시스템 메타데이터 셋업 폼.
3.  **🎙️ Live Editor** (`/editor.html`): 가이드 로봇 수집 대화 기록 수정용 실시간 STT 텍스트 편집기.

---

## 🛡️ 적용된 보안 사양 (수정 및 오염 방지)
*   **Vercel Immutable Deployments**: 본 사이트의 에셋 파일들은 Vercel의 불변형 서버리스 시스템에 읽기 전용(Read-only)으로 보관되어, 외부의 불법적인 조작이나 런타임 상의 파일 수정 시도가 원천 차단됩니다.
*   **CI/CD Pipeline Lock**: 모든 변경 사항은 깃허브 `main` 브랜치의 정식 Pull Request와 커밋 통제를 통해서만 원격 빌드 및 반영이 가능하도록 잠금 처리되었습니다.
