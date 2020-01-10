import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Login = () => import('../components/Login');
const Home = () => import('../components/Home');
const Index = () => import('../views/index/Index');
const Users = () => import('../views/manage/Users');
const serverList = () => import('../views/monitor/serverList');
const serverMonitor = () => import('../views/monitor/serverMonitor');
const partitionDetail = () => import('../views/partition/partitionDetail');
const dbList = () => import('../views/monitor/dbList');
const Inspection = () => import('../views/inspection/Inspection');
const Deploy = () => import('../views/deploy/Deploy');
const Alarm = () => import('../views/alarm/Alarm');
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
      {path: '/serverList', component: serverList},
      {path: '/serverMonitor/:serverName', component: serverMonitor},
      {path: '/partitionDetail/:partitionName', component: partitionDetail},
      {path: '/dbList', component: dbList},
      {path: '/inspection', component: Inspection},
      {path: '/deploy', component: Deploy},
      {path: '/alarm', component: Alarm},
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
