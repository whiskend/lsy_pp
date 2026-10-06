# Dennis Snellenberg 참고 사이트 조사 및 적용 기록

조사일: 2026-10-07 (KST)

참고 사이트: [dennissnellenberg.com](https://dennissnellenberg.com/)

이 문서는 참고 사이트에서 확인한 페이지·구성·동작과, 이를 이승연의 영화 포트폴리오에 맞게 바꾼 내용을 기록한다. 참고 사이트의 공개 HTML/CSS/JavaScript와 사이트맵을 읽었으며, 아래 작품 상세 11개는 별도의 브라우저 탭에서 제목, 주요 미디어 구간, 마지막 탐색 영역까지 직접 방문했다. 조사용 탭은 닫았다. 상세 페이지의 모바일 동작은 소스에서 확인했으며 모바일 실화면 검증과 구분한다.

이 문서는 참고 사이트의 관찰 기록이다. 새 사이트의 실행 점검 결과와 각 점검의 범위는 [VERIFICATION.md](VERIFICATION.md)에 별도로 기록한다.

## 확인한 참조 경로

사이트맵의 기본 페이지 4개와 작품 11개에 더해, Work에서 연결되는 Archive와 공개 Styleguide를 조사했다. `/success`, `/error`는 이름과 달리 404 응답 및 공통 오류 화면을 반환했다. Archive의 외부 프로젝트 목적지는 방문 범위에 포함하지 않았다.

| URL                                                                 | 확인한 구성                                                                                                        |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [Home](https://dennissnellenberg.com/)                              | 큰 인물 이미지, 이동하는 이름, 위치 배지·글로브, 직업, 소개, 대표 작품 행, More work, 연락 푸터                    |
| [Work](https://dennissnellenberg.com/work)                          | 큰 제목, All/Design/Development 필터, 목록·그리드 전환, 11개 작품, Archive 링크                                    |
| [About](https://dennissnellenberg.com/about)                        | 큰 제목, 구분선과 글로브, 사진·소개, 번호가 있는 서비스 3개, 경력·심사 활동, 연락 푸터                             |
| [Contact](https://dennissnellenberg.com/contact)                    | 어두운 배경, 번호가 있는 5개 문의 항목, 원형 제출 버튼, 연락·사업·소셜 정보                                        |
| [Archive](https://dennissnellenberg.com/archive)                    | 과거 작업을 압축한 표와 66개 외부 프로젝트 링크                                                                    |
| [Styleguide](https://dennissnellenberg.com/styleguide)              | 타이포그래피, 색상, 아이콘, 버튼, 입력 요소, 체크·라디오, 알림 예시; 기본 내비게이션에서는 발견되지 않은 공개 경로 |
| [TWICE](https://dennissnellenberg.com/work/twice)                   | 선수 사진, 회녹색 장치 배경, 금색 추상 영상, 세로형 모바일 패널 3개                                                |
| [The Damai](https://dennissnellenberg.com/work/the-damai)           | 리조트 사진, 베이지색 장치 배경, 직원·풍경 사진, 긴 모바일 패널 3개                                                |
| [FABRIC](https://dennissnellenberg.com/work/fabric)                 | 빨강·검정 추상 이미지, 모니터·노트북·프레임 없는 녹화를 섞은 장치 구간 4개                                         |
| [Aanstekelijk](https://dennissnellenberg.com/work/aanstekelijk)     | 보라색 네온 이미지, 노트북, 빨강·검정 화면 녹화, 사무실 전면 사진                                                  |
| [Base Create](https://dennissnellenberg.com/work/base-create)       | 기울어진 휴대전화 합성 이미지, 흰색 노트북 배경, 형광 녹색 작업, 장치 합성 전면 이미지                             |
| [AVVR](https://dennissnellenberg.com/work/avvr)                     | 팀·사무실 사진, 따뜻한 베이지 배경, 검정 테두리가 있는 휴대전화 3개, 화면 녹화                                     |
| [GraphicHunters](https://dennissnellenberg.com/work/graphichunters) | 축구화 이미지, 노트북, 금속 로고 전면 이미지, 휴대전화 3개, 아카이브 녹화                                          |
| [Future Goals](https://dennissnellenberg.com/work/future-goals)     | 해변 축구, 태블릿, 재활용 그물 사진, 모바일 패널, 문장을 겹친 바다 영상, 4열 이미지 콜라주                         |
| [Atypikal](https://dennissnellenberg.com/work/atypikal)             | 검정 타이포그래피 이미지, 따뜻한 회색 모니터 배경, 휴대전화 3개, 가로형 태블릿                                     |
| [One:Nil](https://dennissnellenberg.com/work/one-nil)               | 파란 선수 이미지, 흰색 노트북, 휴대전화 3개, 기울어진 장치 합성, 모니터                                            |
| [Andy Hardy](https://dennissnellenberg.com/work/andy-hardy)         | 사진가 이미지, 산 풍경 노트북 화면, 검정 사진 모음 녹화, 전면 사진·문장, 휴대전화, 큰 이미지 콜라주                |
| [404 확인 경로: success](https://dennissnellenberg.com/success)     | 실제 HTTP 404; 어두운 항공 영상 배경과 홈으로 돌아가는 버튼                                                        |
| [404 확인 경로: error](https://dennissnellenberg.com/error)         | 실제 HTTP 404; 같은 오류 화면                                                                                      |

작품 상세의 다음 작품 순서는 TWICE → The Damai → FABRIC → Aanstekelijk → Base Create → AVVR → GraphicHunters → Future Goals → Atypikal → One:Nil → Andy Hardy → TWICE다.

## 공통 구조와 상세 페이지의 차이

- 상단에는 브랜드 링크와 Work/About/Contact가 있다. 일정 거리 스크롤하면 고정 원형 메뉴 버튼이 나타난다. 메뉴는 오른쪽에서 들어오는 어두운 패널이며, 왼쪽 곡면이 열리는 동안 펴진다.
- 페이지 진입과 이동에는 목적지 이름을 보여주는 곡선 커튼이 있다. 첫 방문에는 여러 언어의 인사를 순서대로 보여준다.
- 기본 푸터에는 큰 연락 문구, 작은 인물 이미지, 구분선을 가로지르는 파란 원형 버튼, 연락 수단, 버전·현지 시간·소셜 링크가 있다.
- 작품 상세는 여백이 큰 흰색 제목 영역, 3열 메타데이터, 넓은 대표 이미지와 겹치는 원형 외부 링크로 시작한다. 1,920px 화면에서 제목은 약 115px, 메타데이터 폭은 약 1,290px, 대표 이미지 폭은 약 1,600px, 원형 버튼은 약 210px였다. 이는 화면 관찰치이며 모든 너비의 고정 규격은 아니다.
- Base Create, GraphicHunters, Andy Hardy의 메타데이터는 Role / Location / Year다. 나머지는 대체로 Role / Credits / Location & Year 구성을 사용한다.
- 미디어는 여백 있는 중립색 배경과 전면 이미지 사이를 오간다. 장치 구간도 노트북 하나로 통일되지 않고 모니터, 태블릿, 프레임 없는 녹화 등이 섞인다. 휴대전화 세 개를 보여주는 구간은 세로 위치가 엇갈리며, 실제 프레임이 있는 경우와 없는 경우가 있다.
- 상세 푸터는 큰 다음 작품 제목과 미리보기, 구분선, All work 버튼을 갖는다. 기본 상태의 미리보기는 얕은 띠처럼 일부만 보이며, 포인터를 올리면 위로 드러나고 제목이 옅어지며 파란 Next case 커서가 나타난다.
- Home 소스에 있는 가로 2행 프로젝트 콜라주는 주석 처리되어 실제 렌더링되지 않는다. 이를 활성 화면의 필수 구간으로 계산하지 않았다.

## 동작과 반응형 관찰

| 참고 사이트에서 확인한 동작                                   | 현재 프로젝트의 적용 방향                                        |
| ------------------------------------------------------------- | ---------------------------------------------------------------- |
| 큰 이름이 계속 이동하고 스크롤 방향에 따라 진행 방향이 바뀜   | 이승연 이름의 가로 이동                                          |
| 첫 인사와 목적지 이름이 있는 곡선 페이지 커튼                 | 같은 역할의 CSS·기본 JavaScript 전환; 정적 다중 페이지 링크 유지 |
| 화면 높이 약 30% 스크롤 후 원형 메뉴 버튼 표시                | 스크롤 위치에 따른 원형 버튼과 `dialog` 기반 메뉴                |
| 오른쪽 메뉴의 곡선 가장자리, 링크 순차 등장, 배경 가림        | 패널 이동·곡면·링크 시차, Escape·배경 클릭 닫기와 포커스 복귀    |
| 버튼과 내부 글자가 포인터를 따라 조금 이동하고 탄력 있게 복귀 | 마그네틱 버튼과 내부 텍스트의 작은 이동; 정밀 포인터에서만 사용  |
| 버튼 안쪽의 색상이 아래에서 차오름                            | 원형·알약 버튼의 파란 채움 전환                                  |
| 작품 행 위에서 이미지·원형 커서가 서로 다른 속도로 따라옴     | 실제 작품 썸네일/GIF를 사용하는 포인터 미리보기                  |
| 제목·문장이 아래에서 나타나고 이미지 일부가 패럴랙스 이동     | 화면 진입 시 등장, 영화 스틸의 제한적인 이동                     |
| 푸터에 닿으면 경계 곡면이 펴짐                                | 스크롤 진행에 따른 푸터 곡선 높이 변화                           |
| Work의 필터, 목록·그리드 전환, 선택 상태 저장                 | Film/Music video 필터와 보기 방식 저장; 실제 공개 작품 수 표시   |
| 반복되는 장치 화면 영상                                       | 보유한 영화 GIF의 호버 재생과 수동 재생 버튼으로 변환            |

참고 소스에서는 주로 GSAP/ScrollTrigger, Locomotive Scroll, Barba, LazyLoad를 사용한다. 현재 프로젝트는 이 라이브러리와 사이트 코드를 복사하지 않고 CSS, 브라우저 API, 기본 JavaScript로 동작을 구성한다.

소스에서 확인한 주요 기준은 `cubic-bezier(.7,0,.3,1)`, 약 0.3–0.9초의 공통 전환, 약 0.8초 메뉴 이동, 짧은 링크 시차, 넓은 `clamp()` 기반 여백이다. 모두 동일한 수치로 복제한 것은 아니다. 참고 사이트에서 동작 줄이기 처리는 발견하지 못했으며, 현재 구현에는 `prefers-reduced-motion` 대응을 추가한다.

참고 사이트의 주요 반응형 변화는 약 1,024px 이하의 작품 행→이미지 카드 전환, 약 620px 이하의 단일 열, 약 540px 이하의 Menu 표시와 전체 폭 메뉴다. 모바일 첫 화면에서는 직업 문구 위치가 바뀌고 위치 배지의 글자는 사라지며 글로브만 남는다. 일부 데스크톱 패럴랙스·마그네틱 효과도 비활성화된다. 새 사이트의 실제 브레이크포인트는 자체 레이아웃에 맞춰 1,024/720/540px를 사용한다.

## 이승연 포트폴리오의 경로별 적용

| 현재 경로       | 적용 내용과 실제 콘텐츠 제약                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| `/`             | 영화 스틸 배경, 큰 이름 이동, 서울예술대학교 배지, Film & Music Video, 소개, 실제 작품 한 편, 연락 푸터       |
| `/work/`        | 작품 목록·그리드, All 01 / Film 01 / Music video 00, 공개 뮤직비디오가 없다는 빈 상태, Archive 연결           |
| `/work/gakjil/` | 〈각질〉 제목·감독·연도·길이, 공식 썸네일과 GIF, YouTube 링크, 같은 영화에서 얻은 장면들, All work 연결       |
| `/about/`       | 이승연·서울예술대학교 재학, 영화와 뮤직비디오에 대한 관심, 영화 스틸, Education 구간                          |
| `/contact/`     | 연락처 준비 중 안내, 문의 초안 작성·복사, YouTube 링크. 이메일이 확인되지 않아 서버 전송 기능은 제공하지 않음 |
| `/archive/`     | 실제 작품 한 편의 영화 목록과 YouTube 링크                                                                    |
| `/styleguide/`  | 현재 색상·서체·버튼·동작·미리보기의 내부 확인용 페이지                                                        |
| `404.html`      | 보유한 영화 스틸 배경, 오류 안내, 홈 연결. GitHub Pages 프로젝트 경로 `/lsy_pp/`를 기준으로 링크 해석         |

공개 작품은 한 편이므로 존재하지 않는 다음 작품을 만들지 않는다. 상세 페이지 마지막은 **All work**로 이어진다. About의 참조 경력·수상·심사 구간은 **Education**으로 바꾸고, 확인되지 않은 경력이나 수상을 채우지 않는다. 이름과 학교, 작품 정보는 기존 저장소의 내용을 사용하며 개인 이메일·전화번호를 추정하지 않는다.

사용자 요청에 따라 영화 미리보기의 초기 화면은 공식 YouTube 썸네일 전체다. 마우스를 올리면 기존 GIF가 재생되고 벗어나면 정지 썸네일로 돌아간다. 이미지 자체는 YouTube 전체 영상으로 연결된다. 썸네일 위에 `Watch film` 문구를 표시하지 않는다. 키보드·터치 환경을 위한 별도의 재생/정지 버튼을 두며, 동작 줄이기에서는 자동 호버 재생을 생략한다.

## 서체·미디어·출처

- 참고의 상용 라이선스 서체 Neue Montreal 파일은 복사하지 않았다. 현재 서체는 유사한 중립적 산세리프 인상을 위한 시스템 스택 `Helvetica Neue`, Helvetica, Arial, `Apple SD Gothic Neo`, `Noto Sans KR`, `sans-serif`다. 설치된 서체에 따라 실제 렌더링은 달라진다.
- 참고의 인물 사진, 프로젝트 이미지·영상, 로고, 개인 소개·연락처는 가져오지 않았다.
- 현재 사이트의 작품 이미지는 모두 기존 〈각질〉 공식 썸네일, 기존 GIF와 그 영화 미디어에서 얻은 스틸이다. 원본 권리는 원 권리자에게 있으며 참조 사이트의 작품을 이승연의 작업처럼 사용하지 않는다.
- GIF 구간은 **03:32–03:39**다. 전체 영화를 비교해 고른 공식 하이라이트라는 주장은 하지 않는다. 기존 출처·규격은 [ASSET-SOURCE.md](ASSET-SOURCE.md)를 따른다.
- 참조 색상은 Charcoal `#1C1D20`, Dark `#141517`, Blue `#455CE9`, Blue hover `#334BD3`, Light gray `#E9EAEB`, White를 중심으로 적용했다.

공개 소스 조사에 사용한 자료:

- [사이트맵](https://dennissnellenberg.com/sitemap.xml)
- [robots.txt](https://dennissnellenberg.com/robots.txt)
- [styleguide.css](https://dennissnellenberg.com/assets/css/styleguide.css)
- [components.css](https://dennissnellenberg.com/assets/css/components.css)
- [style-new.css](https://dennissnellenberg.com/assets/css/style-new.css)
- [index-new.js](https://dennissnellenberg.com/assets/js/index-new.js)

## 검증 범위

최종 정적 검사에서 HTML 8개와 내부 링크·이미지·미리보기 경로 149개를 확인했다. 배포 기준 URL에서 누락된 대상 파일, 중복 ID, 누락된 `aria-controls` 대상, 누락된 내부 앵커는 발견되지 않았다. `node --check portfolio/dist/scripts/site.js`도 통과했다. 이 결과는 파일 경로와 문법에 한정되며 화면·상호작용의 실행 결과를 대신하지 않는다.

정적 점검에서 발견한 모바일 기본 메뉴, 문의 양식의 기본 제출, 필터 선택 표시 문제는 수정했다. 스크립트가 없어도 기본 메뉴·링크·정지 이미지를 제공하고, 문의 복사 버튼은 처리기가 등록된 뒤 활성화한다. 문의 전송 서버는 연결하지 않았으며, 클립보드 실패 시 수동으로 복사할 텍스트를 표시한다. 실행 점검과 검증 한계는 VERIFICATION.md를 참고한다.
