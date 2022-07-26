import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/users',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/LogoutView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/users/show.vue'),
  },
  {
    path: '/users/create',
    name: 'users.create',
    component: () => import('../views/users/create.vue'),
  },
  {
    path: '/users/:id',
    name: 'users.edit',
    component: () => import('../views/users/edit.vue'),
    props: true,
  },
  {
    path: '/roles',
    name: 'roles',
    component: () => import('../views/roles/show.vue'),
  },
  {
    path: '/roles/create',
    name: 'roles.create',
    component: () => import('../views/roles/create.vue'),
  },
  {
    path: '/roles/:id',
    name: 'roles.edit',
    component: () => import('../views/roles/edit.vue'),
    props: true,
  },
  {
    path: '/departments',
    name: 'departments',
    component: () => import('../views/departments/show.vue'),
  },
  {
    path: '/departments/create',
    name: 'departments.create',
    component: () => import('../views/departments/create.vue'),
  },
  {
    path: '/departments/:id',
    name: 'departments.edit',
    component: () => import('../views/departments/edit.vue'),
    props: true,
  },
  {
    path: '/cost-center',
    name: 'cost-center',
    component: () => import('../views/cost-center/show.vue'),
  },
  {
    path: '/cost-center/create',
    name: 'cost-center.create',
    component: () => import('../views/cost-center/create.vue'),
  },
  {
    path: '/cost-center/:id',
    name: 'cost-center.edit',
    component: () => import('../views/cost-center/edit.vue'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  if (['login', 'register'].includes(to.name)) {
    return
  }

  try {
    const response = await fetch(`//localhost:8081/auth/session`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (response.ok) {
      return
    }
  } catch (err) {
    return { name: 'login' }
  }

  return { name: 'login' }
})

export default router
