<script lang="ts">
  import { defineComponent, ref } from 'vue';
  /** External dependencies */
  import { RouterView } from 'vue-router'
  /** Icons */
  import {
    UserOutlined,
    UserAddOutlined
  } from '@ant-design/icons-vue';

  export default defineComponent({
    setup() {
      return {
        selectedKeys: ref<string[]>(['2']),
      };
    },
    components: {
    UserOutlined,
    UserAddOutlined
  },
  });
</script>
<template lang="pug">
.landing-layout
  a-layout#layout-menu
    .header
      a-layout-header(:style="{ position: 'fixed', zIndex: 1, width: '100%' }")
        a-space(:style="{float: 'right'}")
          a-button
            UserAddOutlined
            span Registrarse
          a-button(href="/login")
            UserOutlined
            span Ingresar
        a-menu(
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal")
          a-menu-item(key="1") Nav 1
          a-menu-item(key="2") Nav 2
    .content.margin-top__30
      a-layout-content(:style="{ padding: '0 50px', marginTop: '64px'}")
        a-breadcrumb(:style="{ margin: '16px 0' }")
        div(:style="{ background: '#fff',margin: '24px 16px', padding: '24px', minHeight: '380px' }")
          router-view
    .footer
      a-layout-footer(:style="{ textAlign: 'center' }")
        span Talento Docente ©2023
</template>