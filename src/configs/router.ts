import IndexPage from "../pages/IndexPage.vue";
import TeamPage from "../pages/TeamPage.vue";
import EditPage from "../pages/EditPage.vue";
import UserPage from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import ListPage from "../pages/ListPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import testPage from "../pages/testPage.vue";


const routes = [
    {path: '/',title: '首页', component: IndexPage},
    {path: '/team',title: '寻找队伍', component: TeamPage},
    {path: '/user',title: '个人信息', component: UserPage},
    {path: '/search',title: '搜索', component: SearchPage},
    {path: '/user/edit',title: '更新个人信息', component: EditPage},
    {path: '/search/list', component: ListPage},
    {path: '/user/login',title: '登录', component: UserLoginPage},
    {path: '/team/add', component: TeamAddPage},
    {path: '/team/update',title: '更新队伍信息', component: TeamUpdatePage},
    {path: '/user/team/join',title: '我加入的队伍', component: UserTeamJoinPage},
    {path: '/user/team/create',title: '我创建的队伍', component: UserTeamCreatePage},
    {path: '/user/update',title: '用户可更新信息', component: UserUpdatePage},
    {path: '/test', component: testPage},
]


export default routes;