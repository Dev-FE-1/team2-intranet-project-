import { createRouter } from './route/route';
import UserInfo from './userinfo/UserInfo';
import Mypage from './mypage/Mypage';
export default createRouter([
  { path: '/info', component: UserInfo },
  { path: '/mypage', component: Mypage },
]);
