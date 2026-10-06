# 이승연 포트폴리오

이승연의 영화·뮤직비디오 포트폴리오입니다. [Dennis Snellenberg](https://dennissnellenberg.com/)의 화면 구성과 움직임을 참고한 정적 다중 페이지 사이트로, 단편영화 〈각질〉 한 편과 실제 영상에서 추출한 장면을 소개합니다.

[포트폴리오 사이트 열기](https://whiskend.github.io/lsy_pp/)

사이트 파일: `portfolio/dist/` · HTML 생성기: `portfolio/tools/build.mjs`

실행·수정 안내: [portfolio/README.md](portfolio/README.md)

```sh
node portfolio/tools/build.mjs
python3 -m http.server 4173 --bind 127.0.0.1 --directory portfolio/dist
```

브라우저: http://127.0.0.1:4173

npm 의존성은 없습니다. 생성된 HTML과 공통 CSS·JavaScript를 저장소에 함께 관리하며, 기존 GitHub Pages 워크플로가 `portfolio/dist/`를 게시합니다. 작품 이미지는 공식 YouTube 썸네일로 시작하고, 마우스를 올리거나 미리보기 버튼을 누르면 GIF가 재생됩니다. 연락처가 확정되기 전까지 문의 양식은 내용 복사만 지원하며 메시지를 전송하지 않습니다.
