/** Interfaces */
import type { RouteMetaInterface } from "@/interfaces/route_meta.interface"

export default {
  path: "postulations",
  name: "Postulation",
  redirect: "/portal/postulations/list",
  component: () => import("@/components/layouts/BlankLayout.vue"),
  children: [
    {
      path: "list",
      name: "PostulationList",
      component: () => import("@/views/postulation/PostulationListView.vue"),
      meta: {
        requiredAuth: true,
        authRoute: false
      } as RouteMetaInterface
    },
    {
      path: ":method/:id",
      name: "PostulationForm",
      component: () => import("@/views/postulation/PostulationFormView.vue"),
      meta: {
        requiredAuth: true,
        authRoute: false
      } as RouteMetaInterface
    }
  ]
};
