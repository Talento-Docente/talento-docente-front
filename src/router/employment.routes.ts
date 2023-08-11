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
        requiredAuth: true
      }
    },
    {
      path: ":method/:id",
      name: "EmploymentForm",
      component: () => import("@/views/employment/EmploymentFormView.vue"),
      meta: {
        requiredAuth: true
      }
    },
    {
      path: "employment_jobs",
      name: "EmploymentJobsView",
      component: () => import("@/views/employment/EmploymentJobsView.vue"),
      meta: {
        requiredAuth: true
      }
    }
  ]
}
