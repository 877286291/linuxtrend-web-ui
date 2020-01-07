import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Login = () => import('../components/Login');
const Home = () => import('../components/Home');
const Index = () => import('../views/index/Index');
const Users = () => import('../views/user/Users');

const routes = [
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
