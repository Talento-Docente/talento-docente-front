export default {
    path: 'recruitment',
    name: 'Recruitment',
    redirect: '/portal/recruitment',
    component: () => import('@/components/layouts/BlankLayout.vue'),
    children: [
      {
        path: "",
        name: "Recruitment",
        component: () => import("@/views/recruitment/RecruitmentListView.vue"),
        meta: {
          requiredAuth: true
        }
      },
      {
        path: ":method/:id",
        name: "RecruitmentForm",
        component: () => import("@/views/recruitment/RecruitmentFormView.vue"),
        meta: {
          requiredAuth: true
        }
      },
    ],
  }