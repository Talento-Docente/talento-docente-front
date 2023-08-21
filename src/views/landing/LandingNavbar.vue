<script lang="ts">
import { defineComponent } from "vue";
import {
  HomeOutlined,
  LoginOutlined,
  FormOutlined
} from '@ant-design/icons-vue'

export default defineComponent({

  components: {
    HomeOutlined,
    LoginOutlined,
    FormOutlined
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
        a-sub-menu(key="register")
          template(#title)
            span Registrate aquí
          template(#icon)
            form-outlined
          a-menu-item-group(title="¿Registrarse como?")
            a-menu-item(key="RegisterEmployee", @click="() => $router.push({ name: 'Register', params: { register_type: 'professional' } })")
              span Profesionales
            a-menu-item(key="RegisterBusiness", @click="() => $router.push({ name: 'Register', params: { register_type: 'establishment' } })")
              span Empresas

        a-sub-menu(key="login")
          template(#title)
            span Iniciar Sesión
          template(#icon)
            login-outlined
          a-menu-item-group(title="¿Iniciar como?")
            a-menu-item(key="loginEmployee", @click="() => $router.push({ name: 'Login', params: { login_type: 'professional' } })")
              span Profesionales
            a-menu-item(key="loginBusiness", @click="() => $router.push({ name: 'Login', params: { login_type: 'establishment' } })")
              span Empresas

</template>

