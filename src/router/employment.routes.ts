export default {
  path: 'employments',
  name: 'Employment',
  component: () => import('@/views/employment/EmploymentListView.vue'),
  meta: {
    requiredAuth: true
  },
}
