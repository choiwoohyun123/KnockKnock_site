<img src="./front/public/002.png" alt="logo" width="50%" />

## 📄 개요

- 서비스명: 낙낙
- 기획 기간: 2023.07.10 ~ 2023.07.21
- 개발 기간: 2023.07.10 ~ 2023.08.11
- 주제: 같은 가치관을 공유하는, 진지한 연애를 원하는 사회 초년생과 안정적인 성인을 대상으로 하는 심층적인 만남의 기회를 제공하는 서비스
- 목표: "낙낙은 두 사람을 특별한 시간과 공간으로 이끄는 재미있는 경험을 제공한다.”

<br/>

## 🫶 팀원 소개

**정원석**

- Front-End

**최우현**

- Front-End

**정유진**

- Front-End

**정재훈**

- Back-End

**허창원**

- Back-End

**이은석**

- Back-End

<br/>

## 기술 스택

### Front-End

<div>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
</div>
<br />

### Back-End

<div>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/MySQL-47A248?style=flat-square&logo=MySQL&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-41454A?style=flat-square&logo=JSON%20web%20tokens&logoColor=white"/>
<img src="https://img.shields.io/badge/Passport-34E27A?style=flat-square&logo=Passport&logoColor=white"/>

</div>

<br />

### Server-Infra

<div>
<img src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white"/>
<img src="https://img.shields.io/badge/pm2-2B037A?style=flat-square&logo=pm2&logoColor=white"/>
</div>

#### **인공지능**

<div>
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=Python&logoColor=white"/>
<img src="https://img.shields.io/badge/opencv-150458?style=flat-square&logo=opencv&logoColor=white"/>
<img src="https://img.shields.io/badge/sklearn-013243?style=flat-square&logo=scikitlearn&logoColor=white"/>
<img src="https://img.shields.io/badge/tensorflow-orange?style=flat-square&logo=tensorflow&logoColor=black"/>
<img src="https://img.shields.io/badge/flask-ffffff?style=flat-square&logo=flask&logoColor=black"/>
<img src>
</div>

<br />

### 서비스 구조

<img src="front/res/sr.png" alt="service structure" width="600px" />

### 프로젝트 기획

<br/>

- **서비스 설명**
  1. **기획 의도 (문제 제시, 문제 해결)**
     - 직장인이 되면 대학생에 비해서 인간관계 폭이 좁아지는 현상이 발생한다.
       그로 인해 내가 원하는 이성을 만날 기회가 줄어든다. 소모임 등 다양한 커뮤니티에 참여로 시간을 할애하는 것이 부담스러운 사람들을 대상으로 만남의 기회를 제공하자!
     - 표면적으로는 코로나 기간 동안 사람 만나기 어려웠고, 요즘 세대의 특성으로 “서울대 소비트렌드 분석센터 트렌드코리아” 책에서 발표한 키워드 중에 '목적 관계'라는 것이 있다.
     - 예전의 기성세대들은 인간관계 확장을 대부분 우연, 인연에 기대서 했지만, 요즘 세대들은 내가 원하는 관계를 만들어 낸다. 따라서 연애에서도 취미와 목적이 뚜렷하고 비슷한 사람들끼리 만남을 이어나갈려 하는 목적 관계가 요즘 트렌드 중에 하나로 판단했다.
     - KnockKnock 에서는 유저들의 데이터를 기준으로 서로의 가치관과 성향 취미 등이 비슷한 유저들을 추천 해 주는 기능을 도입하여, 서비스 사용 유저가 자신의 이상형을 쉽게 발견 할 수 있도록 돕고, 실제 오프라인에서의 만남을 주도하여 만족스러운 연애 경험을 제공하고자 한다.
  2. **웹 서비스의 최종적인 메인 기능과 서브 기능 설명**
     1. 메인기능
        1. AI를 이용한 퍼스널 컬러 추천과 화장 기능
        2. 회원 데이터를 분석해서 서로 잘 맞는 유저를 추천 해주는 기능
        3. 게시글을 통한 모임 생성 기능
     2. 서브기능
        1. 소켓을 이용한 실시간 채팅 기능
        2. 타로 운세 게임을 통한 유저 추천 기능

<br/>

#### 페이지 구성

- ##### **홈페이지**
  <img src="front/res/mainpage.png" alt="mainpage" width="300px" />
  <br />
- ##### **로그인**
  <img src="front/res/login.png" alt="login" width="300px" />
- ##### **회원가입**
  <img src="front/res/register.png" alt="register" width="600px" />
- ##### **마이페이지**
  <img src="front/res/mypage.png" alt="mypage" width="300px" />
  <img src="front/res/mypage_edit.png" alt="edit" width="300px" />
  <img src="front/res/mypage_editpwd.png" alt="edit" width="300px" />
- ##### **오늘의 낙낙**
  <img src="front/res/todayknock1.png" alt="TodayKnock" width="300px" />
  <img src="front/res/todayknock2.png" alt="TodayKnock" width="300px" />
  <img src="front/res/todayknock_post.png" alt="TodayKnock" width="300px" />
  <img src="front/res/todayknock_addpost.png" alt="TodayKnock" width="300px" />
  <img src="front/res/todayknock_list.png" alt="TodayKnock" width="300px" />
  <img src="front/res/todayknock_in.png" alt="TodayKnock" width="300px" />
  <img src="front/res/todayknock_userprofile.png" alt="TodayKnock" width="300px" />
- ##### **히히낙낙**
   <img src="front/res/play1.png" alt="play" width="300px" />
   <img src="front/res/play2.png" alt="play" width="300px" />
- ##### **뷰티톡톡**
  <img src="front/res/beautyAI1.png" alt="ai" width="300px" />
  <img src="front/res/beautyAI2.png" alt="ai" width="300px" />

## 🗂 프로젝트 구조

### [Front-End ](#)

```
📦src
 ┣ 📂api
 ┃ ┣ 📜login.js
 ┃ ┗ 📜todayknock.js
 ┣ 📂assets
 ┃ ┣ 📜.DS_Store
 ┃ ┣ 📜alert.jsx
 ┃ ┣ 📜fall.png
 ┃ ┣ 📜favicon.png
 ┃ ┣ 📜knock.png
 ┃ ┣ 📜loading.gif
 ┃ ┣ 📜react.svg
 ┃ ┣ 📜spring.png
 ┃ ┣ 📜summer.png
 ┃ ┣ 📜wait.jpeg
 ┃ ┗ 📜winter.png
 ┣ 📂components
 ┃ ┣ 📂commons
 ┃ ┃ ┗ 📜Pagenation.jsx
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜UseImageUpload.js
 ┃ ┃ ┣ 📜useIsMobile.js
 ┃ ┃ ┗ 📜useToggle.js
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜Layout.jsx
 ┃ ┃ ┗ 📜breakpoint.js
 ┃ ┣ 📂modal
 ┃ ┃ ┣ 📜DropdownMenu.jsx
 ┃ ┃ ┣ 📜Modal.jsx
 ┃ ┃ ┗ 📜Toast.jsx
 ┃ ┣ 📂play
 ┃ ┃ ┣ 📜GenderInfo.jsx
 ┃ ┃ ┣ 📜ParticipantList.jsx
 ┃ ┃ ┣ 📜ParticipantUserModal.jsx
 ┃ ┃ ┗ 📜PostCard.jsx
 ┃ ┣ 📂sections
 ┃ ┃ ┣ 📜DesktopMenu.jsx
 ┃ ┃ ┣ 📜Footer.jsx
 ┃ ┃ ┣ 📜Header.jsx
 ┃ ┃ ┣ 📜Layout.jsx
 ┃ ┃ ┗ 📜MobileMenu.jsx
 ┃ ┗ 📜.DS_Store
 ┣ 📂constants
 ┃ ┣ 📜CategoryConstants.js
 ┃ ┗ 📜registerConstants.js
 ┣ 📂context
 ┃ ┗ 📂user
 ┃ ┃ ┗ 📜UserProvider.jsx
 ┣ 📂pages
 ┃ ┣ 📂ai
 ┃ ┃ ┣ 📜Ai.jsx
 ┃ ┃ ┗ 📜style.js
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📜LoginPage.jsx
 ┃ ┃ ┗ 📜style.js
 ┃ ┣ 📂mainpage
 ┃ ┃ ┣ 📜Carousel.jsx
 ┃ ┃ ┗ 📜MainPage.jsx
 ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📜ChatService.jsx
 ┃ ┃ ┣ 📜MyPage.jsx
 ┃ ┃ ┣ 📜UserNewPwdandOut.jsx
 ┃ ┃ ┣ 📜UserPostAndParticipants.jsx
 ┃ ┃ ┣ 📜UserProfileEdit.jsx
 ┃ ┃ ┣ 📜UserProfileLarge.jsx
 ┃ ┃ ┗ 📜style.js
 ┃ ┣ 📂play
 ┃ ┃ ┣ 📜Play.jsx
 ┃ ┃ ┣ 📜PlayAdd.jsx
 ┃ ┃ ┣ 📜PlayDetail.jsx
 ┃ ┃ ┗ 📜PlayEdit.jsx
 ┃ ┣ 📂register
 ┃ ┃ ┣ 📜ModalHobby.jsx
 ┃ ┃ ┣ 📜ModalIdeal.jsx
 ┃ ┃ ┣ 📜ModalPersonality.jsx
 ┃ ┃ ┣ 📜OptionalInputs.jsx
 ┃ ┃ ┣ 📜RegisterPage.jsx
 ┃ ┃ ┣ 📜RequiredInputs.jsx
 ┃ ┃ ┣ 📜ValidationFields.jsx
 ┃ ┃ ┗ 📜style.js
 ┃ ┣ 📂todayknock
 ┃ ┃ ┣ 📜TodayGame.jsx
 ┃ ┃ ┣ 📜TodayKnock.jsx
 ┃ ┃ ┣ 📜UserModal.jsx
 ┃ ┃ ┗ 📜UserProfile.jsx
 ┃ ┗ 📜.DS_Store
 ┣ 📂routes
 ┃ ┣ 📜Router.jsx
 ┃ ┗ 📜routes.jsx
 ┣ 📂util
 ┃ ┣ 📜TimeAgo.js
 ┃ ┣ 📜arrayUtils.js
 ┃ ┣ 📜checkGender.js
 ┃ ┣ 📜common.js
 ┃ ┣ 📜currentDateTime.js
 ┃ ┣ 📜formatDate.js
 ┃ ┣ 📜handleTimeChange.js
 ┃ ┣ 📜handleTotalChange.js
 ┃ ┣ 📜imageCheck.js
 ┃ ┣ 📜isWriter.js
 ┃ ┗ 📜validateTotal.js
 ┣ 📜.DS_Store
 ┣ 📜App.jsx
 ┣ 📜api.js
 ┣ 📜index.css
 ┣ 📜main.jsx
 ┗ 📜reducer.jsx
```

### [Back-End](#)

```
📦src
 ┣ 📂config
 ┃ ┗ 📜config.js
 ┣ 📂controllers
 ┃ ┣ 📜cardController.js
 ┃ ┣ 📜chatController.js
 ┃ ┣ 📜commentController.js
 ┃ ┣ 📜fileController.js
 ┃ ┣ 📜messageController.js
 ┃ ┣ 📜participantController.js
 ┃ ┣ 📜postController.js
 ┃ ┗ 📜userController.js
 ┣ 📂db
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜CardModel.js
 ┃ ┃ ┣ 📜ChatModel.js
 ┃ ┃ ┣ 📜CommentModel.js
 ┃ ┃ ┣ 📜FileModel.js
 ┃ ┃ ┣ 📜MessageModel.js
 ┃ ┃ ┣ 📜ParticipantModel.js
 ┃ ┃ ┣ 📜PostModel.js
 ┃ ┃ ┗ 📜UserModel.js
 ┃ ┣ 📂schemas
 ┃ ┃ ┣ 📜card.js
 ┃ ┃ ┣ 📜cardFile.js
 ┃ ┃ ┣ 📜chatRoom.js
 ┃ ┃ ┣ 📜comment.js
 ┃ ┃ ┣ 📜file.js
 ┃ ┃ ┣ 📜message.js
 ┃ ┃ ┣ 📜participant.js
 ┃ ┃ ┣ 📜post.js
 ┃ ┃ ┣ 📜postFile.js
 ┃ ┃ ┣ 📜tag.js
 ┃ ┃ ┣ 📜tagCategory.js
 ┃ ┃ ┣ 📜user.js
 ┃ ┃ ┣ 📜userCard.js
 ┃ ┃ ┣ 📜userFile.js
 ┃ ┃ ┗ 📜userTag.js
 ┃ ┣ 📜.DS_Store
 ┃ ┣ 📜index.js
 ┃ ┗ 📜knockknock.sql
 ┣ 📂middlewares
 ┃ ┣ 📜commentParamsValidate.js
 ┃ ┣ 📜commentVaildate.js
 ┃ ┣ 📜createPostValidate.js
 ┃ ┣ 📜errorMiddleware.js
 ┃ ┣ 📜getCommentValidate.js
 ┃ ┣ 📜getPostValidate.js
 ┃ ┣ 📜loginRequired.js
 ┃ ┣ 📜loginValidate.js
 ┃ ┣ 📜morgan.js
 ┃ ┣ 📜participantParamsValidate.js
 ┃ ┣ 📜postParamsValidate.js
 ┃ ┣ 📜registerValidate.js
 ┃ ┣ 📜setPasswodValidate.js
 ┃ ┣ 📜setPostValidate.js
 ┃ ┣ 📜updateCommentValidate.js
 ┃ ┗ 📜userParamsValidate.js
 ┣ 📂routers
 ┃ ┣ 📜cardRouter.js
 ┃ ┣ 📜chatRouter.js
 ┃ ┣ 📜commentRouter.js
 ┃ ┣ 📜fileRouter.js
 ┃ ┣ 📜messageRouter.js
 ┃ ┣ 📜participantRouter.js
 ┃ ┣ 📜postRouter.js
 ┃ ┗ 📜userRouter.js
 ┣ 📂services
 ┃ ┣ 📜cardService.js
 ┃ ┣ 📜chatService.js
 ┃ ┣ 📜commentService.js
 ┃ ┣ 📜messageService.js
 ┃ ┣ 📜participantService.js
 ┃ ┣ 📜postService.js
 ┃ ┗ 📜userService.js
 ┣ 📂swagger
 ┃ ┣ 📜api.yaml
 ┃ ┗ 📜swagger.js
 ┣ 📂utils
 ┃ ┣ 📜chatFunctions.js
 ┃ ┣ 📜commonFunctions.js
 ┃ ┣ 📜logger.js
 ┃ ┣ 📜participantFunctions.js
 ┃ ┣ 📜postFunctions.js
 ┃ ┣ 📜statusCode.js
 ┃ ┣ 📜upload.js
 ┃ ┗ 📜userFunction.js
 ┣ 📜.DS_Store
 ┗ 📜app.js
```

<br/>

## 🏁 테스트 방법

---

1. 해당 프로젝트를 clone 합니다.

   ```
   git clone 리포주소
   ```

2. 프로젝트 실행에 필요한 패키지를 설치합니다.

   ```
    cd knock_front
    yarn install
   ```

   ```
   cd knock_back
   yarn install
   ```

3. 프론트와 백엔드를 실행합니다.

   ```
   cd knock_front
   yarn dev
   ```

   ```
   cd knock_back
   yarn start
   ```
