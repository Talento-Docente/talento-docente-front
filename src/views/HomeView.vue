<script lang="ts">
/** External dependencies */
import { defineComponent } from 'vue'

/** Internal dependencies */
/** Stores */
import { authStore } from "@/stores/auth.store";

/** Components */
import EstablishmentHome from '@/views/home/EstablishmentHome.vue'
import ProfessionalHome from '@/views/home/ProfessionalHome.vue'

/** Constants */
import { ROLE_SUPER_ADMIN, ROLE_ESTABLISHMENT, ROLE_APPLICANT } from '@/constants/user.constants'

export default defineComponent({

  components: {
    EstablishmentHome,
    ProfessionalHome
  },

  data () {
    return {
      /** Filters */
      selectStatuses: 'all',

      /** Stores */
      authStore: authStore(),

      /** Loader */
      loading: false,

      /** Constants */
      ROLE_SUPER_ADMIN,
      ROLE_ESTABLISHMENT,
      ROLE_APPLICANT
    }
  },

  async mounted () {
  },

  methods: {
  }

})
</script>

<template lang="pug">
.main
  professional-home(v-if="[ROLE_APPLICANT].indexOf(authStore.role) > -1")
  establishment-home(v-if="[ROLE_ESTABLISHMENT, ROLE_SUPER_ADMIN].indexOf(authStore.role) > -1")

</template>
