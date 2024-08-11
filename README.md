# 올웨이즈 프론트엔드 엔지니어 채용 과제

## 개발 환경 설정

### 1. node.js 설치

vite를 이용해 프로젝트가 build되기 때문에 18.20.2 이상의 node.js를 설치해 주세요.

**node.js 사이트에서 설치**

- https://nodejs.org/ko/

**nvm으로 node.js 설치**

```
# 18.20.2 이상의 버전이 설치되어 있지 않은 경우 설치해 주세요.
$ nvm install 18.20.2

$ nvm use 18.20.2
```

### 2. 의존성 설치

```
# yarn이 설치되어 있지 않은 경우 설치해 주세요.
$ npm install --global yarn

$ yarn install
```

### 3. 로컬 서버 실행

```
$ yarn dev
```

- http://localhost:5173

## 질문

### 1. 자신의 기술적인 역량을 바탕으로 가장 크게 임팩트(테크적인 임팩트, 비즈니스 임팩트 등)를 만들어 낸 사례가 있다면 그 이유와 함께 작성해주시기 바랍니다.
- 부트캠프를 수강하던 시절, API 관련 내용을 잘 이해하지 못해 실전 테스트를 여러 번 했던 적이 있습니다. 이때 다양한 API를 사용해 보았고, 이 경험으로부터 프로젝트를 진행하면서 API를 좀 더 쉽게 다룰 수 있었고, 네이버, 카카오, 공공 API 등을 적절히 활용하여 프로젝트의 퀄리티를 높일 수 있었습니다. 그 중 가장 기억에 남는 것은 스타트업 경진대회에 출품했던 '전기차 지도 CPM'에 사용했던 카카오맵 API 활용입니다. 해당 API를 이용해 단순히 지도를 가져오는 것 뿐만 아니라, 원하는 위치에 마커를 찍거나 마커에 마우스 이벤트를 추가하고, 현재 보고 있는 위치의 주소를 실시간으로 변경하는 등 정말 다양한 기능을 활용했었습니다. 덕분에 주소 목록으로만 되어 있던 리스트를 지도로 시각화하여 접근성을 높일 수 있었고, 마커 기능을 통해 사용자들에게 더 나은 사용성을 제공 할 수 있었습니다. 추가로, 해당 프로젝트를 진행하며 각 충전소별 통계 기능을 추가했는데, 이때는 데이터를 시각화 하기 위해 Recharts 라이브러리를 사용했습니다. 숫자로만 되어있는 데이터들을 막대, 꺾은선, 분포도 등 여러 타입의 그래프로 나타내어 다양한 데이터들을 직관적으로 볼 수 있게 하여 사용성을 더더욱 높였던 적이 있습니다.

### 2. 인생이나 커리어 관점에서 향후 목표가 있으시다면 작성해 주시기 바랍니다.
- 프론트엔드 개발자를 꿈꾸게 된 이유는 멋진 페이지를 만들고 싶다는 열망이 있어서입니다. 단순히 웹 페이지 뿐만 아니라, 다양한 플랫폼이나 홈페이지, 혹은 정말 작은 배너라도 제가 만든 페이지가 많은 사용자들에게 노출되고, 그 사람들이 제 페이지를 사용하며 최고의 경험을 얻어가는 것이 궁극적인 목표입니다.
