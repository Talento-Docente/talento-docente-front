/** Interfaces */
import type { RouteMetaInterface } from "@/interfaces/route_meta.interface"

export default {
  path: 'employments',
  name: 'Employment',
  redirect: '/portal/employments/list',
  component: () => import('@/components/layouts/BlankLayout.vue'),
  children: [
    {
      path: "list",
      name: "EmploymentList",
      component: () => import("@/views/employment/EmploymentListView.vue"),
      meta: {
        requiredAuth: true,
        authRoute: false
      } as RouteMetaInterface
    },
    {
      path: ":method/:id",
      name: "EmploymentForm",
      component: () => import("@/views/employment/EmploymentFormView.vue"),
      meta: {
        requiredAuth: true,
        authRoute: false
      } as RouteMetaInterface
    },
    {
      path: ":id/employment_jobs",
      name: "EmploymentJobsView",
      component: () => import("@/views/employment/EmploymentJobsView.vue"),
      meta: {
        requiredAuth: true,
        authRoute: false
      } as RouteMetaInterface
    }
  ]
}
