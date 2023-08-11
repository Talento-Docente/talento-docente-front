<script lang="ts">
import { defineComponent } from "vue";
import { HomeOutlined, LoginOutlined } from '@ant-design/icons-vue'

export default defineComponent({

  components: {
    HomeOutlined,
    LoginOutlined
  },

  setup() {
    return {};
  },

  data() {
    return {};
  },

  mounted() {
  },

  methods: {}

});
</script>

<template lang="pug">
a-layout-header.landing-navbar
  a-row(justify="space-between")
    a-col
      a-menu(mode="horizontal", theme="dark")
        a-menu-item(key="home")
          span Talento Docente
          template(#icon)
            home-outlined
    a-col
      a-menu(mode="horizontal", theme="dark")
        a-menu-item(key="register")
          span Registrate aquí
        a-sub-menu(key="login")
          template(#title)
            span Iniciar Sesión
          template(#icon)
            login-outlined
          a-menu-item-group(title="¿Iniciar como?")
            a-menu-item(key="loginEmployee", @click="() => $router.push({ name: 'LoginEmployee' })")
              span Profesionales
            a-menu-item(key="loginBusiness", @click="() => $router.push({ name: 'LoginBusiness' })")
              span Empresas

</template>

