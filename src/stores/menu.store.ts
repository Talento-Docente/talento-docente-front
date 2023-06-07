/** External dependencies */
import { defineStore } from 'pinia'
import { computed } from "vue";

/** Internal dependencies */
/** Constants */
/** Services */
/** Interfaces */
export const menuStore = defineStore('menu', {

  state: () => ({
    collapsed: false as boolean
  }),

  actions: {
    changeMenu() {
      this.collapsed = !this.collapsed
    }
  },
})
