/** Interfaces */
import type { RouteMetaInterface } from "@/interfaces/route_meta.interface"

export default {
  path: "postulations",
  name: "Postulation",
  component: () => import("@/views/postulation/PostulationListView.vue"),
  meta: {
    requiredAuth: true,
    authRoute: false
  } as RouteMetaInterface
};
