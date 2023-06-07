export default {
  path: 'establishments',
  name: 'Establishment',
  redirect: '/portal/establishments/list',
  component: () => import('@/components/layouts/BlankLayout.vue'),
  children: [
    {
      path: 'list',
      name: 'EstablishmentList',
      component: () => import('@/views/establishment/EstablishmentListView.vue'),
      meta: {
        requiredAuth: true
      },
    },
    {
      path: ':method/:id',
      name: 'EstablishmentForm',
      component: () => import('@/views/establishment/EstablishmentFormView.vue'),
      meta: {
        requiredAuth: true
      },
    }
  ],
}
