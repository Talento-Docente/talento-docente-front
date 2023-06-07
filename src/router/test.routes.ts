export default {
  path: "tests",
  name: "Test",
  component: () => import("@/views/test/TestListView.vue"),
  meta: {
    requiredAuth: true
  }
};
