<script setup lang="ts">
/** External dependencies */
import { RouterView } from 'vue-router'

/** Internal dependencies */
/** Components */
import LateralMenuComponent from "@/components/layouts/LateralMenuComponent.vue";
import NavbarTopComponent from "@/components/layouts/NavbarTopComponent.vue";

</script>

<template lang="pug">
.portal-layout
  a-layout#layout-menu
    lateral-menu-component
    navbar-top-component
      template(v-slot:content)
        a-layout-content(:style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }")
          router-view
</template>l
