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
        requiredAuth: true
      }
    },
    {
      path: ":method/:id",
      name: "ApplicantForm",
      component: () => import("@/views/applicant/ApplicantFormView.vue"),
      meta: {
        requiredAuth: true
      }
    },
    {
      path: "showaplicant/:id",
      name: "ApplicantShow",
      component: () => import("@/views/applicant/ApplicantShowView.vue"),
      meta: {
        requiredAuth: true
      }
    }
  ]
};
