
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'register', component: () => import('pages/Users/Register.vue') },
      { path: 'login', component: () => import('pages/Users/Login.vue') },
      { path: 'employees/', component: () => import('pages/Employees/Index.vue') },
      { path: 'employees/add', component: () => import('pages/Employees/Add.vue') },
      { path: 'employees/edit', component: () => import('pages/Employees/Edit.vue') },
      { path: 'departments/', component: () => import('pages/Departments/Index.vue') },
      { path: 'departments/add', component: () => import('pages/Departments/Add.vue') },
      { path: 'departments/edit/:id', component: () => import('pages/Departments/Edit.vue') },
      { path: 'departments/delete/:id', component: () => import('pages/Departments/Delete.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
