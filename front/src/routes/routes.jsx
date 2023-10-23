import Mainpage from "../pages/mainpage/MainPage";
import Ai from "../pages/ai/Ai";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import TodayKnock from "../pages/todayknock/TodayKnock";
import Play from "../pages/play/Play";
import PlayAdd from "../pages/play/PlayAdd";
import MyPage from "../pages/mypage/MyPage";
import PlayDetail from "../pages/play/PlayDetail";
import PlayEdit from "../pages/play/PlayEdit";

export const ROUTE = {
  MAIN: {
    path: "/",
    link: "/",
    element: Mainpage,
  },
  LOGIN: {
    path: "/login",
    link: "/login",
    element: LoginPage,
  },
  REGISTER: {
    path: "/register",
    link: "/register",
    element: RegisterPage,
  },
  AI: {
    path: "/ai",
    link: "/ai",
    element: Ai,
  },
  TodayKnock: {
    path: "/todayknock",
    link: "/todayknock",
    element: TodayKnock,
  },
  Play: {
    link: "/play",
    path: "/play",
    element: Play,
  },
  PlayAdd: {
    path: "/playadd",
    link: "/playadd",
    element: PlayAdd,
  },
  PlayEdit: {
    path: "/playedit/:id",
    link: "/playedit",
    element: PlayEdit,
  },
  PlayDetail: {
    path: "/playdetail/:id",
    link: "/playdetail",
    element: PlayDetail,
  },
  Mypage: {
    path: "/mypage",
    link: "/mypage",
    element: MyPage,
  },
};

export const ROUTE_ARR = Object.values(ROUTE);
