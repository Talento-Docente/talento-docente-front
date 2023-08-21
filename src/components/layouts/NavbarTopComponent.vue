<script lang="ts">
/** External dependencies */
import { defineComponent, ref } from 'vue'

/** Store */
import { menuStore } from '@/stores/menu.store'
import { authStore } from '@/stores/auth.store'

/** Constants */
import { ROLE_APPLICANT } from '@/constants/user.constants'

/** Icons */
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';

export default defineComponent({

  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },

  data: () => ({
    /** Store */
    menuStore: menuStore(),
    authStore: authStore(),

    /** Constants */
    ROLE_APPLICANT
  })

})

</script>

<template lang="pug">
a-layout
  a-layout-header(style="background: #fff; padding: 0")
    menu-unfold-outlined(v-if="menuStore.collapsed", class="trigger", @click="menuStore.changeMenu()")
    menu-fold-outlined(v-else class="trigger" @click="menuStore.changeMenu()")
    .float-right(v-if="authStore.role !== ROLE_APPLICANT")
      a-form-item(label="Seleccione un establecimiento").margin-right__20.line-height__unset
        a-select(
          v-model:value="authStore.selectedEstablishmentId",
          placeholder="Seleccione establecimiento..",
          @change="(selectedEstablishmentId) => authStore.selectEstablishment(selectedEstablishmentId)"
        ).width__300px
          template(#notFoundContent)
            .text-align__center Sin Información
          a-select-option(v-for="permission in authStore.permissions", :value="permission.establishment.id") {{ permission.establishment.name }}
  slot(name="content")
</template>
