# 🛒 중고거래사이트 프로젝트

```
중고 물품을 등록하고 실시간채팅을 통해 거래를 이어갈수있는 프로젝트
```

**기간**

2024.06.03 ~ 2024.06.28

**팀원**
| **김영욱** | **이영호** | **최미영** | 
| :------: |  :------: | :------: | 
| [<img src="https://github.com/SuperCoding24/fe01_naverwebtoon/assets/101804857/8f42d59b-0745-42fb-9b32-59a5bb634856" height=150 width=150> <br/> @kywu9232](https://github.com/kywu9232) | [<img src="https://github.com/SuperCoding24/fe01_naverwebtoon/assets/101804857/917191c8-73ab-4a99-9af9-be16c5d9b08e" height=150 width=150> <br/> @zeroho931](https://github.com/zeroho931) | [<img src="https://github.com/SuperCoding24/fe01_naverwebtoon/assets/101804857/508f7584-3fc8-4a94-b535-9cc7257f6ee7" height=150 width=150> <br/> @meeyoungchoi](https://github.com/meeyoungchoi-front-dev) |


<br />

## **🌳 개발 환경**

- Front : HTML, React, styled-components
- Back-end : Java, Spring Boot , db: mariadb (aws rds) , 서버: aws ec2
- 버전 및 이슈관리 : Github, Github Project
- 협업 툴 : Discord, Notion
- 서비스 배포 환경 : Vercel
- 커밋 컨벤션
  
<br />

## **🔎 채택한 개발 기술**

- React
    - 컴포넌트화를 통해 추후 유지보수와 재사용성을 고려했습니다.
    - 유저 배너, 상단과 하단 배너 등 중복되어 사용되는 부분이 많아 컴포넌트화를 통해 리소스 절약이 가능했습니다.
- styled-component
    - props를 이용한 조건부 스타일링을 활용하여 상황에 알맞은 스타일을 적용시킬 수 있었습니다.
    - 빌드될 때 고유한 클래스 이름이 부여되어 네이밍 컨벤션을 정하는 비용을 절약할 수 있었습니다.
- prettier
    - 정해진 규칙에 따라 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 했습니다.
    - 코드 포맷팅은 prettier에 일임해 사용했습니다.
- 브랜치 전략
    - Git-flow 전략을 기반으로 main, feature 보조 브랜치를 운용했습니다.
    - 기능 이슈, 버그 이슈 템플릿을 만들어 이슈 단위로 개발을 진행하였고 이슈에는 기능 설명, 작업 상세 내용을 작성하였습니다.
 
<br /> 

## **🪴 Git 전략**

### 브랜치 전략

- Git-flow 전략을 기반으로 main, feature 보조 브랜치를 운용했습니다.
- 기능 이슈, 버그 이슈 템플릿을 만들어 이슈 단위로 개발을 진행하였고 이슈에는 기능 설명, 작업 상세 내용을 작성하였습니다.
  


### 커밋 컨벤션

| Type 키워드 | 사용 시점 |
| --- | --- |
| bug | 버그 발생 보고 및 해결 기록 |
| chore | .gitignore처럼 외부 사용자가 관심없는 파일, 빌드 혹은 패키지 매니저 수정사항 |
| design | css등 사용자 UI, 디자인 변경 |
| docs | 문서 생성 및 수정 |
| feat | 새 기능 추가 |
| fix | 기능 수정 |
| hotFix | 급하게 치명적인 버그를 고쳐야 하는 경우 |
| invaild | 잘못된 부분이 있어보임 |
| refactor | 기존 코드의 입출력 값은 일치, 코드 내부 성능 개선 및 클린업 |
| remove | 파일 삭제 |
| style | 코드 포맷 변경, 세미콜론 누락 등 스타일과 관련된 코드 수정, 그러나 코드 수정은 없는 경우 |
| rename | 파일 혹은 폴더명을 수정만 한 경우 |
| setting | 환경 설정 & 라이브러리 설치 |
| test | 테스트 관련 수정, 빌드 업무 및 패키지 매니지 수정 |

<br />

