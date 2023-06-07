<script lang="ts">
/** External dependencies */
import { defineComponent, ref } from 'vue'

/** Store */
import { menuStore } from '@/stores/menu.store'

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
    selectedKeys: ref<string[]>(['1']),

    /** Store */
    menuStore
  })

})

</script>

<template lang="pug">
a-layout
  a-layout-header(style="background: #fff; padding: 0")
    menu-unfold-outlined(v-if="menuStore().collapsed", class="trigger", @click="menuStore().changeMenu()")
    menu-fold-outlined(v-else class="trigger" @click="menuStore().changeMenu()")
  slot(name="content")
</template>
