<script lang="ts">
import { defineComponent } from "vue";

/** Icons */
import {
  HomeOutlined,
  UserOutlined,
  LoginOutlined,
  FormOutlined
} from '@ant-design/icons-vue'

/** Stores */
import { authStore } from '@/stores/auth.store'

export default defineComponent({

  components: {
    HomeOutlined,
    LoginOutlined,
    FormOutlined,
    UserOutlined
  },

  setup() {
    return {};
  },

  data() {
    return {
      /** Stores */
      authStore: authStore()

    };
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
        a-menu-item(key="home", @click="() => $router.push({ name: 'Landing' })")
          span Talento Docente
          template(#icon)
            home-outlined
    a-col
      a-menu(mode="horizontal", theme="dark")
        a-sub-menu(key="register", v-if="!authStore.isAuthenticated")
          template(#title)
            span Registrate aquí
          template(#icon)
            form-outlined
          a-menu-item-group(title="¿Registrarse como?")
            a-menu-item(key="RegisterEmployee", @click="() => $router.push({ name: 'Register', params: { register_type: 'professional' } })")
              span Profesionales
            a-menu-item(key="RegisterBusiness", @click="() => $router.push({ name: 'Register', params: { register_type: 'establishment' } })")
              span Empresas

        a-sub-menu(key="login", v-if="!authStore.isAuthenticated")
          template(#title)
            span Iniciar Sesión
          template(#icon)
            login-outlined
          a-menu-item-group(title="¿Iniciar como?")
            a-menu-item(key="loginEmployee", @click="() => $router.push({ name: 'ProfessionalLogin' })")
              span Profesionales
            a-menu-item(key="loginBusiness", @click="() => $router.push({ name: 'EstablishmentLogin' })")
              span Empresas

        a-menu-item(key="home", v-else, @click="() => $router.push({ name: 'Home' })")
          span {{ authStore.user.first_name }} {{ authStore.user.last_name }}
          template(#icon)
            user-outlined

</template>

