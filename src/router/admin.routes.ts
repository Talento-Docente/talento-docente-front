/** Interfaces */
import type { RouteMetaInterface } from "@/interfaces/route_meta.interface"

export default {
  path: "admin",
  name: "Admin",
  redirect: "/portal/admin",
  component: () => import("@/components/layouts/BlankLayout.vue"),
  children: [
    {
      path: "my_profile",
      name: "MyProfile",
      component: () => import("@/views/admin/my_profile/MyProfileView.vue"),
      meta: {
        requiredAuth: true,
        authRoute: false
      } as RouteMetaInterface
    },
    {
      path: "my_business",
      name: "MyBusiness",
      component: () => import("@/views/admin/my_business/MyBusinessView.vue"),
      meta: {
        requiredAuth: true,
        authRoute: false
      } as RouteMetaInterface
    },

    {
      path: 'tests',
      name: 'Test',
      redirect: '/portal/admin/tests/list',
      component: () => import('@/components/layouts/BlankLayout.vue'),
      children: [
        {
          path: 'list',
          name: 'TestList',
          component: () => import('@/views/admin/test/TestListView.vue'),
          meta: {
            requiredAuth: true,
            authRoute: false
          } as RouteMetaInterface
        },
        {
          path: ':method/:id',
          name: 'TestForm',
          component: () => import('@/views/admin/test/TestFormView.vue'),
          meta: {
            requiredAuth: true,
            authRoute: false
          } as RouteMetaInterface
        }
      ],
    }
  ]
};
