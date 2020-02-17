import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Login = () => import('../components/Login');
const Home = () => import('../components/Home');
const Index = () => import('../views/index/Index');
const Users = () => import('../views/manage/Users');
const Servers = () => import('../views/manage/Servers');
const serverList = () => import('../views/monitor/serverList');
const serverMonitor = () => import('../views/monitor/serverMonitor');
const partitionDetail = () => import('../views/partition/partitionDetail');
const dbList = () => import('../views/monitor/dbList');
const Inspection = () => import('../views/inspection/Inspection');
const singleDeploy = () => import('../views/deploy/SingleDeploy');
const batchDeploy = () => import('../views/deploy/BatchDeploy');
const Alert = () => import('../views/alert/Alert');
const Log = () => import('../views/log/Log');

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
      {path: '/serverList', component: serverList},
      {path: '/serverMonitor/:serverName', component: serverMonitor},
      {path: '/partitionDetail/:partitionName', component: partitionDetail},
      {path: '/dbList', component: dbList},
      {path: '/inspection', component: Inspection},
      {path: '/singleDeploy', component: singleDeploy},
      {path: '/batchDeploy', component: batchDeploy},
      {path: '/alert', component: Alert},
      {path: '/log', component: Log},
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
