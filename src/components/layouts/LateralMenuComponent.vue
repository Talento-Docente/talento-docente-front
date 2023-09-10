<script lang="ts">
/** External dependencies */
import { defineComponent, ref } from 'vue'

/** Icons */
import {
  HomeOutlined,
  BankOutlined,
  FolderOutlined,
  UserOutlined,
  UserSwitchOutlined,
  SolutionOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  TeamOutlined

} from '@ant-design/icons-vue';

/** Internal dependencies */
/** Store */
import { menuStore } from '@/stores/menu.store'
import { authStore } from '@/stores/auth.store'

/** Constants */
import { ROLE_SUPER_ADMIN, ROLE_ESTABLISHMENT, ROLE_APPLICANT } from '@/constants/user.constants'

export default defineComponent({

  components: {
    HomeOutlined,
    BankOutlined,
    FolderOutlined,
    UserOutlined,
    UserSwitchOutlined,
    SolutionOutlined,
    LogoutOutlined,
    AppstoreOutlined,
    TeamOutlined
  },

  data: () => ({
    selectedKeys: ref<string[]>(['1']),

    /** store */
    menuStore: menuStore(),
    authStore: authStore(),

    /** Constants */
    ROLE_SUPER_ADMIN,
    ROLE_ESTABLISHMENT,
    ROLE_APPLICANT
  }),

  methods: {
    async logout () {
      try {
        await this.authStore.logout()
      } catch(error) {
        console.log({ error })
      } finally {
        this.$router.push({ name: 'Landing' })
      }
    }
  }
})

</script>

<template lang="pug">
a-layout-sider(:collapsed="menuStore.collapsed", collapsible, :trigger="null")

  .logo(@click="() => $router.push({ name: 'Landing' })")
    template(v-if="menuStore.collapsed")
      .font-size__20.color__white.text-align__center TD
    template(v-else)
      .font-size__20.color__white.text-align__center Talento Docente

  a-menu(v-model:selectedKeys="selectedKeys" theme="dark" mode="inline")
    a-menu-item(key="1", @click="() => $router.push({ name: 'Home' })")
      home-outlined
      span Dashboard

    a-menu-item(key="2", @click="() => $router.push({ name: 'Establishment' })", v-if="[ROLE_SUPER_ADMIN].indexOf(authStore.role) > -1")
      bank-outlined
      span Empresas

    a-menu-item(key="3", @click="() => $router.push({ name: 'Employment' })", v-if="[ROLE_SUPER_ADMIN, ROLE_ESTABLISHMENT].indexOf(authStore.role) > -1")
      folder-outlined
      span Trabajos

    a-menu-item(key="4", @click="() => $router.push({ name: 'Applicant' })", v-if="[ROLE_SUPER_ADMIN, ROLE_ESTABLISHMENT].indexOf(authStore.role) > -1")
      TeamOutlined
      span Postulantes

    a-menu-item(key="5", @click="() => $router.push({ name: 'Postulation' })", v-if="[ROLE_SUPER_ADMIN, ROLE_APPLICANT].indexOf(authStore.role) > -1")
      user-outlined
      span Mis Postulaciones

    //a-menu-item(key="5", @click="() => $router.push({ name: 'Postulation' })")
    //  user-switch-outlined
    //  span Postulaciones

    //a-menu-item(key="6", @click="() => $router.push({ name: 'Test' })", :disabled="true")
    //  solution-outlined
    //  span Pruebas

    a-menu-divider

    //a-sub-menu(key="admin")
    //  template(#title)
    //    span Administración
    //  template(#icon)
    //    appstore-outlined

    a-menu-item(key="71", @click="() => $router.push({ name: 'MyProfile' })")
      user-outlined
      span Mi Perfil

    a-menu-item(key="72", @click="() => $router.push({ name: 'MyBusiness' })", v-if="[ROLE_SUPER_ADMIN, ROLE_ESTABLISHMENT].indexOf(authStore.role) > -1")
      bank-outlined
      span Mi Empresa

    a-menu-item(key="73", @click="() => $router.push({ name: 'Flow' })", v-if="[ROLE_SUPER_ADMIN, ROLE_ESTABLISHMENT].indexOf(authStore.role) > -1")
      home-outlined
      span Flujos Reclutamiento

    a-menu-item(key="tests", @click="() => $router.push({ name: 'Test' })", v-if="[ROLE_SUPER_ADMIN, ROLE_ESTABLISHMENT].indexOf(authStore.role) > -1")
      home-outlined
      span Pruebas

    //a-menu-item(key="7", @click="() => $router.push({ name: 'Admin' })")
    //  appstore-outlined
    //  span Administración

    a-menu-divider

    a-menu-item(key="7", @click="logout")
      logout-outlined
      span Cerrar Sesión

</template>
