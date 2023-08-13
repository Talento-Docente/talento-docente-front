/** External dependencies */
import { createRouter, createWebHistory } from 'vue-router'

/** Internal dependencies */
/** Routes */
import EstablishmentRoutes from '@/router/establishment.routes'
import EmploymentRoutes from '@/router/employment.routes'
import ApplicantRoutes from '@/router/applicant.routes'
import PostulationRoutes from '@/router/postulation.routes'
import TestRoutes from '@/router/test.routes'
import MyProfile from '@/router/myprofile.routes'
import Recruitment from '@/router/recruitment.routes'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'Landing',
      redirect: '/landing',
      component: () => import('@/components/layouts/BlankLayout.vue'),
      children: [
        {
          path: 'landing',
          name: 'LandingPage',
          component: () => import('@/views/landing/LandingSchema.vue'),
          meta: {
            requiredAuth: false
          },
        },
      ]
    },

    {
      path: '/login',
      name: 'Login',
      redirect: '/login/employees',
      component: () => import('@/components/layouts/BlankLayout.vue'),
      children: [
        {
          path: 'employees',
          name: 'LoginEmployee',
          component: () => import('@/views/auth/LoginView.vue'),
          meta: {
            requiredAuth: false
          },
        },
        {
          path: 'businesses',
          name: 'LoginBusiness',
          component: () => import('@/views/auth/LoginView.vue'),
          meta: {
            requiredAuth: false
          },
        },
      ]
    },

    {
      path: '/portal',
      name: 'PortalLayout',
      redirect: '/home',
      component: () => import('@/components/layouts/PortalLayout.vue'),
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('@/views/HomeView.vue'),
          meta: {
            requiredAuth: true
          },
        },

        EstablishmentRoutes,
        EmploymentRoutes,
        ApplicantRoutes,
        PostulationRoutes,
        TestRoutes,
        MyProfile,
        Recruitment

      ]
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/errors/PageNotFound.vue')
    }

  ]
})

export default router
