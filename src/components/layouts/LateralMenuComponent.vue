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
  LogoutOutlined

} from '@ant-design/icons-vue';

/** Internal dependencies */
/** Store */
import { menuStore } from '@/stores/menu.store'
import { authStore } from '@/stores/auth.store'

export default defineComponent({

  components: {
    HomeOutlined,
    BankOutlined,
    FolderOutlined,
    UserOutlined,
    UserSwitchOutlined,
    SolutionOutlined,
    LogoutOutlined
  },

  data: () => ({
    selectedKeys: ref<string[]>(['1']),

    /** store */
    menuStore: menuStore(),
    authStore: authStore()
  }),

  methods: {
    async logout () {
      try {
        await this.authStore.logout()
      } catch(error) {
        console.log({ error })
      } finally {
        this.$router.push({ name: 'Login' })
      }
    }
  }
})

</script>

<template lang="pug">
a-layout-sider(:collapsed="menuStore.collapsed", collapsible, :trigger="null")
  .logo
  a-menu(v-model:selectedKeys="selectedKeys" theme="dark" mode="inline")
    a-menu-item(key="1", @click="() => $router.push({ name: 'Home' })")
      home-outlined
      span Dashboard

    a-menu-item(key="2", @click="() => $router.push({ name: 'Establishment' })")
      bank-outlined
      span Empresas

    a-menu-item(key="3", @click="() => $router.push({ name: 'Employment' })")
      folder-outlined
      span Trabajos

    a-menu-item(key="4", @click="() => $router.push({ name: 'Applicant' })")
      user-outlined
      span Postulantes

    a-menu-item(key="5", @click="() => $router.push({ name: 'Postulation' })")
      user-switch-outlined
      span Postulaciones

    a-menu-item(key="6", @click="() => $router.push({ name: 'Test' })")
      solution-outlined
      span Pruebas

    a-divider

    a-menu-item(key="7", @click="logout")
      logout-outlined
      span Cerrar Sesión
</template>
