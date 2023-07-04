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
      a-layout-header(:style="{ position: 'fixed', zIndex: 1, width: '100%'}")
        a-row(type="flex" justify="space-around" align="middle" :gutter="[20,20]")
          a-col(:xl="{ span: 6 }")
              a-menu(
                v-model:selectedKeys="selectedKeys"
                theme="dark"
                mode="horizontal")
                a-menu-item(key="1") Nav 1
                a-menu-item(key="2") Nav 2

          a-col(:xl="{ span: 6 }")
            a-input-search(v-model:value="value"
              placeholder="input search text"
              enter-button
              @search="onSearch")
              span sas
              
          a-col(:xl="{ span: 6 }")
            a-space(:style="{float: 'right'}")
              a-button
                UserAddOutlined
                span Registrarse
              a-button(href="/login")
                UserOutlined
                span Ingresar
    .content.margin-top__30
      a-layout-content(:style="{ padding: '0 50px', marginTop: '64px'}")
        a-breadcrumb(:style="{ margin: '16px 0' }")
        div(:style="{ background: '#fff',margin: '24px 16px', padding: '24px', minHeight: '380px' }")
          router-view
    .footer
      a-layout-footer(:style="{ textAlign: 'center' }")
        span Talento Docente ©2023
</template>