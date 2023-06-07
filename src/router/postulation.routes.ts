export default {
  path: "postulations",
  name: "Postulation",
  component: () => import("@/views/postulation/PostulationListView.vue"),
  meta: {
    requiredAuth: true
  }
};
