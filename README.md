<br />
<br />

## 1. Overview
* React를 사용해 지뢰찾기(Minesweeper) 게임을 구현해보는 프로젝트
* 확인방법 :
  * 결과는 아래 Demo URL을 통해 확인
  * 모던 브라우저에서 확인 가능 (IE 미지원)
  * 로컬에서 프로젝트 확인 시 클론 후 터미널에 `npm start`로 로컬 서버 실행
> **Demo URL** : https://lightnsalt513.github.io/minesweeper-react

<br />
<br />

## 2. 주요 기술 스택 & 라이브러리
  * `React` & `React Hooks` (상태관리는 useReducer 사용)
  * `styled-components`

<br />
<br />

## 3. 주요 개발 스펙
  * 남은 지뢰 개수, 소요된 시간(초단위) 표시
  * 각 왼쪽, 오른쪽 클릭에 따른 셀의 노출 또는 깃발 표기 기능
  * 리셋 버튼 클릭 시 게임 초기화
  * 아무 숫자도 없는 영역 클릭 시 인접 셀들 노출
  * 최고기록 10개 노출 (localStorage에 저장)
