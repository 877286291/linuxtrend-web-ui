import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Login = () => import('../components/Login');
const Home = () => import('../components/Home');
const Index = () => import('../views/index/Index');
const Users = () => import('../views/manage/Users');
const Servers = () => import('../views/manage/Servers');
const ServerList = () => import('../views/monitor/ServerList');
const ServerMonitor = () => import('../views/monitor/ServerMonitor');
const PartitionDetail = () => import('../views/partition/PartitionDetail');
const DbList = () => import('../views/monitor/DbList');
const Inspection = () => import('../views/inspection/Inspection');
const SingleDeploy = () => import('../views/deploy/SingleDeploy');
const BatchDeploy = () => import('../views/deploy/BatchDeploy');
const Alert = () => import('../views/alert/Alert');
const Log = () => import('../views/log/Log');
const UserCenter = () => import('../views/user/UserCenter');

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/index',
    children: [
      {path: '/index', component: Index},
      {path: '/users', component: Users},
      {path: '/servers', component: Servers},
      {path: '/serverList', component: ServerList},
      {path: '/serverMonitor/:serverName', component: ServerMonitor},
      {path: '/partitionDetail/:partitionName', component: PartitionDetail},
      {path: '/dbList', component: DbList},
      {path: '/inspection', component: Inspection},
      {path: '/singleDeploy', component: SingleDeploy},
      {path: '/batchDeploy', component: BatchDeploy},
      {path: '/alert', component: Alert},
      {path: '/log', component: Log},
      {path: '/userCenter', component: UserCenter},
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/login');
  next()
});

export default router
