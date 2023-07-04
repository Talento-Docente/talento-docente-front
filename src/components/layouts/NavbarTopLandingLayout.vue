<script lang="ts">
  import { defineComponent, ref } from 'vue';
  /** External dependencies */
  import { RouterView } from 'vue-router'
  /** Interfaces */
  import type { MenuProps } from 'ant-design-vue';
  /** Icons */
  import {
    UserOutlined,
    UserAddOutlined,
    DownOutlined,
    BankOutlined,
    QuestionCircleOutlined
    
  } from '@ant-design/icons-vue';

  export default defineComponent({
    setup() {
      return {
        selectedKeys: ref<string[]>(['2']),
      };
    },
    components: {
    UserOutlined,
    UserAddOutlined,
    DownOutlined,
    BankOutlined,
    QuestionCircleOutlined
  },
  });
</script>
<template lang="pug">
.landing-layout
  a-layout#layout-menu
    .header
      a-layout-header(:style="{ position: 'fixed', zIndex: 1, width: '100%'}")
        a-row(type="flex" justify="space-around" align="middle")
          a-col(flex="auto")
            //- Logo
            a-avatar(src="src/assets/talento-docente/default.png" size="large")
          //- Central menu options
          a-col(:xl="{ span: 16 }")
              a-menu(
                v-model:selectedKeys="selectedKeys"
                v-model:openKeys="openKeys"
                theme="dark"
                mode="horizontal")
                //- a-menu-item(key="1")
                //-   a(href=" ")
                //-   span Home
                a-menu-item(key="pro") Profesionales
                a-menu-item(key="emp") Empleadores
                a-sub-menu(key="est" title="Establecimientos")
                  a-sub-menu(key="est-nor" title="Zona Norte")
                    a-menu-item(key="15") XV Region
                    a-menu-item(key="1") I Region
                  a-sub-menu(key="est-cen" title="Zona Central")
                    a-sub-menu(key="est-v" title="V Region")
                      a-menu-item(key="Valparaiso") Valparaiso
                      a-menu-item(key="Viña") Viña
                    a-sub-menu(key="est-met" title="Region Metropolitana")
                      a-menu-item(key="Conchalí") Conchalí
                  a-sub-menu(key="est-sur" title="Zona Sur")
                   a-menu-item(key="6") VI Region
                   a-menu-item(key="7") VII Region
                //- a-menu-item(key="Help")
                //-   span   Ayuda 
                //-   QuestionCircleOutlined

          //- Right Options menu Buttons - submenu/Register-Login
          a-col(flex="auto")
            a-space(:style="{float: 'right'}")
              a-dropdown
                template(#overlay)
                  a-menu
                    a-menu-item(key="7")
                      UserAddOutlined
                      span  Profesional
                    a-menu-item(key="8")
                      BankOutlined
                      span  Empleador
                a-button
                  span Registrarse
                  DownOutlined
              a-button(href="/login")
                UserOutlined
                span Ingresar
          a-col(flex="auto")
            a-menu(
              v-model:selectedKeys="selectedKeys"
              theme="dark"
              mode="horizontal")
              a-menu-item(key="Help" :style="{background: 'none'}")
                span   Ayuda 
                QuestionCircleOutlined
    //- Body Content
    .content.margin-top__30
      a-layout-content(:style="{ padding: '0 50px', marginTop: '64px'}")
        a-breadcrumb(:style="{ margin: '16px 0' }")
        div(:style="{ background: '#fff',margin: '24px 16px', padding: '24px', minHeight: '380px' }")
          router-view
    .footer
      a-layout-footer(:style="{ textAlign: 'center' }")
        span Talento Docente ©2023
</template>