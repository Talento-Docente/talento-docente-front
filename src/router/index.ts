/** External dependencies */
import { createRouter, createWebHistory } from 'vue-router'

/** Internal dependencies */
/** Routes */
import EstablishmentRoutes from '@/router/establishment.routes'
import EmploymentRoutes from '@/router/employment.routes'
import ApplicantRoutes from '@/router/applicant.routes'
import PostulationRoutes from '@/router/postulation.routes'
import TestRoutes from '@/router/test.routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //JobsApp => Jobs Applicant
    {
      path: '',
      name: 'BlankLayout',
      redirect: '/jobsapp',
      component: () => import('@/components/layouts/NavbarTopLandingLayout.vue'),
      children: [

        {
          path: '/jobsapp',
          name: 'JobsApp',
          component: () => import('@/views/landing/JobsApplicantView.vue'),
          meta: {
            requiredAuth: false
          },
        },
      ]
    },

    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
      requiredAuth: false
      },
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
        TestRoutes

      ]
    }

  ]
})

export default router
