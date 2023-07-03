<script setup>
/** External dependencies */
import { defineComponent, ref } from 'vue'
</script>
<template lang="pug">
.landing
  .filter
    a-row(:gutter="[20, 20]")
      a-col(:xl="{ span: 6 }")
        a-form-item(label="Buscar por")
          a-input(placeholder="Nombre, dirección, teléfono...")

      a-col
        a-form-item
          a-button(type="primary")
            span Buscar

      a-col
        a-form-item
          a-button(type="primary")
            span Crear

</template>