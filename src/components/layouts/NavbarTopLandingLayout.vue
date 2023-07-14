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

    data: () => ({
      selectedKeys: ref<string[]>(['2']),
    }),

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
  a-layout
    a-layout-header()
      a-row(type="flex" justify="space-around")
        a-col(:span="4" :xs="{ order: 1 }" :sm="{ order: 2 }" :md="{ order: 3 }" :lg="{ order: 4 }")
          //- Logo
          a-avatar(src="src/assets/talento-docente/default.png" size="large")
        //- Central menu options
        a-col(:span="12" :xs="{ order: 1 }" :sm="{ order: 2 }" :md="{ order: 3 }" :lg="{ order: 4 }")
            a-menu(
              v-model:selectedKeys="selectedKeys"
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

        //- Right Options menu Buttons - submenu/Register-Login
        a-col(:span="6" :xs="{ order: 1 }" :sm="{ order: 2 }" :md="{ order: 3 }" :lg="{ order: 4 }")
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
        
        a-col(:span="2" :xs="{ order: 1 }" :sm="{ order: 2 }" :md="{ order: 3 }" :lg="{ order: 4 }")
          a-menu(
            v-model:selectedKeys="selectedKeys"
            theme="dark"
            mode="horizontal")
            a-menu-item(key="Help" :style="{background: 'none'}")
              span   Ayuda 
              QuestionCircleOutlined
    //- Body Content
  .content
    a-layout-content(:style="{ padding: '0 50px', marginTop: '64px'}")
      div(:style="{ background: '#fff',margin: '24px 16px', padding: '24px', minHeight: '380px' }")
        router-view
  .footer
    a-layout-footer(:style="{ textAlign: 'center' }")
      span Talento Docente ©2023
</template>