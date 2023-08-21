/** Interfaces */
import type { RouteMetaInterface } from "@/interfaces/route_meta.interface"

export default {
  path: "applicants",
  name: "Applicant",
  redirect: "/portal/applicants/list",
  component: () => import("@/components/layouts/BlankLayout.vue"),
  children: [
    {
      path: "list",
      name: "ApplicantList",
      component: () => import("@/views/applicant/ApplicantListView.vue"),
      meta: {
        requiredAuth: true,
        authRoute: false
      } as RouteMetaInterface
    },
    {
      path: ":method/:id",
      name: "ApplicantForm",
      component: () => import("@/views/applicant/ApplicantFormView.vue"),
      meta: {
        requiredAuth: true,
        authRoute: false
      } as RouteMetaInterface
    }
  ]
};
