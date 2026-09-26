# 이승연 영상 포트폴리오

검정 배경의 반응형 영상 포트폴리오입니다. 외부 라이브러리나 빌드 과정 없이 동작합니다.

## 미리보기

저장소 루트에서:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory portfolio/dist
```

브라우저에서 http://127.0.0.1:4173 을 엽니다. HTML 파일을 직접 열어도 주요 기능은 동작합니다.

## 수정할 곳

- `dist/index.html`: 이름, 소개, 작품 제목·연도·길이, YouTube 링크. 이름은 저장소 설명의 '이승연'을 사용했고 소개는 임시 문구입니다. 영문 표기와 연락처는 확인 전이라 넣지 않았습니다.
- `dist/styles.css`: 검정 배경, 서체, 간격, 모바일 화면.
- `dist/script.js`: GIF 재생/정지, 동작 줄이기 설정 반영, 현재 연도.
- `dist/assets/`: 실제 영상에서 추출한 GIF와 정지 이미지.

## 영상

처음에는 정지 썸네일을 표시합니다. 영상 위에 마우스를 올리면 〈각질〉 03:32–03:39의 7초 GIF가 반복 재생되고, 마우스를 떼면 썸네일로 돌아옵니다. 썸네일·GIF 또는 작품 정보를 클릭하면 제공된 YouTube 전체 영상이 새 탭으로 열립니다.

모바일과 키보드 사용자는 별도 미리보기 재생/정지 버튼을 사용할 수 있습니다. 운영체제의 '동작 줄이기'를 켜면 마우스를 올려도 자동 재생하지 않으며, 버튼을 눌러 직접 재생할 수 있습니다. JavaScript 없이도 정지 썸네일과 영상 링크가 표시됩니다.

미리보기 GIF: 720×311, 12fps, 약 5.35 MB. 영상에 포함된 검은 레터박스만 제거했습니다. 출처와 추출 정보는 `ASSET-SOURCE.md`를 참고하세요.

## 게시

[공개 사이트](https://whiskend.github.io/lsy_pp/)는 GitHub Pages로 무료 호스팅합니다.

`main` 브랜치의 `portfolio/dist/` 파일을 수정하고 GitHub에 올리면 자동으로 배포됩니다. 배포 설정은 `.github/workflows/deploy-pages.yml`이며, `portfolio/dist/` 안의 사이트 파일만 게시합니다. 문서만 수정한 경우에는 배포를 실행하지 않습니다.

배포 상태는 저장소의 [Actions](https://github.com/whiskend/lsy_pp/actions/workflows/deploy-pages.yml)에서 확인할 수 있습니다. 필요한 경우 같은 화면의 `Run workflow`로 수동 재배포할 수 있습니다.
