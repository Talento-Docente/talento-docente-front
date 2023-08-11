export default {
    path: "admin",
    name: "Admin",
    redirect: "/portal/admin",
    component: () => import("@/components/layouts/BlankLayout.vue"),
    children: [
      {
        path: "my_profile",
        name: "MyProfile",
        component: () => import("@/views/myprofile/MyProfileView.vue"),
        meta: {
          requiredAuth: true
        }
      },
    ]
  };
  