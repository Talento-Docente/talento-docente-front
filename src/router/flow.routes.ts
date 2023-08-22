/** Interfaces */
import type { RouteMetaInterface } from "@/interfaces/route_meta.interface"

export default {
  path: 'flow',
  name: 'Flow',
  redirect: '/portal/flow',
  component: () => import('@/components/layouts/BlankLayout.vue'),
  children: [
    {
      path: "",
      name: "Flow",
      component: () => import("@/views/admin/flow/FlowListView.vue"),
      meta: {
        requiredAuth: true,
        authRoute: false
      } as RouteMetaInterface
    },
    {
      path: ":method/:id",
      name: "FlowForm",
      component: () => import("@/views/admin/flow/FlowFormView.vue"),
      meta: {
        requiredAuth: true,
        authRoute: false
      } as RouteMetaInterface
    },
  ],
}
