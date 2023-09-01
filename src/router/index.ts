/** External dependencies */
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

/** Internal dependencies */
/** Stores */
import { authStore } from "@/stores/auth.store"

/** Interfaces */
import type { RouteMetaInterface } from '@/interfaces/route_meta.interface'

/** Routes */
import EstablishmentRoutes from '@/router/establishment.routes'
import EmploymentRoutes from '@/router/employment.routes'
import ApplicantRoutes from '@/router/applicant.routes'
import PostulationRoutes from '@/router/postulation.routes'
import AdminRoute from '@/router/admin.routes'
import FlowRoute from '@/router/flow.routes'


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
            requiredAuth: false,
            authRoute: false
          } as RouteMetaInterface,
        },
      ]
    },

    {
      path: '/',
      name: 'EmploymentPublic',
      redirect: '/employment/public/:employment_id',
      component: () => import('@/components/layouts/BlankLayout.vue'),
      children: [
        {
          path: 'employment/public/:employment_id',
          name: 'EmploymentPublicView',
          component: () => import('@/views/employment/EmploymentPublicView.vue'),
          meta: {
            requiredAuth: false,
            authRoute: false
          } as RouteMetaInterface,
        },
      ]
    },

    {
      path: '/login/:login_type',
      name: 'Login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        requiredAuth: false,
        authRoute: true
      } as RouteMetaInterface,
    },

    {
      path: '/register/:register_type',
      name: 'Register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: {
        requiredAuth: false,
        authRoute: true
      } as RouteMetaInterface,
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
            requiredAuth: true,
            authRoute: false
          } as RouteMetaInterface,
        },

        EstablishmentRoutes,
        EmploymentRoutes,
        ApplicantRoutes,
        PostulationRoutes,
        AdminRoute,
        FlowRoute

      ]
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: '/'
      // component: () => import('@/views/errors/PageNotFound.vue')
    }

  ] as RouteRecordRaw[]
})

function isAuthenticated() {
  return authStore().isAuthenticated;
}

function requiredAuth(to: RouteLocationNormalized) {
  const meta: RouteMetaInterface = <RouteMetaInterface><unknown>to.meta
  return meta.requiredAuth
}

function authRoute(to: RouteLocationNormalized) {
  const meta: RouteMetaInterface = <RouteMetaInterface><unknown>to.meta
  return meta.authRoute
}

router.beforeEach(async (to, from, next) => {
  if (requiredAuth(to) && !isAuthenticated()) {
    next('/')
  } else if (authRoute(to) && isAuthenticated()) {
    next('/portal/home')
  } else if (requiredAuth(to) && isAuthenticated()){
    await authStore().getProfile()
    next()
  } else {
    next()
  }
})

export default router
