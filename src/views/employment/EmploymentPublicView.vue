<script lang="ts">
/** External dependencies */
import { defineComponent, ref } from 'vue'
import { message } from 'ant-design-vue'

/** Internal dependencies */
/** Store */
import { employmentStore } from '@/stores/employment.store'
import { authStore } from '@/stores/auth.store'

/** Components */
import LandingNavbar from "@/views/landing/LandingNavbar.vue";

/** Constants */
import { STATUSES, EMPLOYMENT_TYPES, SCHEDULE_TYPES, QUALIFICATIONS } from "@/constants/employment.constants";

/** Icons */
import {
  StarOutlined,
  UserOutlined
} from '@ant-design/icons-vue';

export default defineComponent({

  components: {
    LandingNavbar,
    StarOutlined,
    UserOutlined
  },

  data: () => ({
    /** Employment View */
    selectedEmploymentId: ref<number>(0),

    /** Store */
    employmentStore: employmentStore(),
    authStore: authStore(),

    /** Loader */
    loadingEmployment: false,

    /** CountPostulants */
    countPostulants: 0,

    /** Constants */
    EMPLOYMENT_TYPES,
    STATUSES,
    SCHEDULE_TYPES,
    QUALIFICATIONS,

    textDefault: '' +
      '<div id="lipsum">\n' +
      '<p>\n' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae dui et nunc aliquam laoreet in a magna. Mauris venenatis placerat nunc et sodales. Nam posuere, diam in semper eleifend, quam felis gravida massa, sed mollis nisl ante sed tellus. Curabitur eget quam neque. Proin faucibus dui at est efficitur facilisis non sit amet lectus. Curabitur enim arcu, sodales eu molestie eget, pharetra in nisl. Fusce rutrum urna eros, nec semper mi gravida eget. Sed eget aliquet lorem. Fusce sed neque eget purus dignissim facilisis. In lobortis ipsum nisl, vestibulum dictum arcu mattis ac. Sed in ante at tortor malesuada rhoncus ut sed enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla id ante turpis. In cursus tincidunt eros. Maecenas sodales ac ligula molestie feugiat. Nullam at volutpat urna.\n' +
      '</p>\n' +
      '<p>\n' +
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec dignissim sem ut lorem convallis semper. Maecenas pulvinar orci id cursus tempor. Etiam et libero sed leo luctus fermentum et sed nisl. Nulla fermentum facilisis eros eget molestie. Proin molestie nunc tellus, bibendum scelerisque magna aliquam nec. Etiam nisi eros, consectetur vitae vestibulum feugiat, tempus vitae lectus.\n' +
      '</p>\n' +
      '<p>\n' +
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus pulvinar, nunc vel tempus mattis, elit sem dignissim diam, et eleifend augue urna et felis. Pellentesque ornare nibh tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum sagittis, eros non auctor cursus, magna dui gravida diam, euismod volutpat eros velit in nibh. Mauris vel malesuada velit, ut tempor nibh. Donec dignissim, mauris ut laoreet vehicula, libero risus aliquam neque, sit amet eleifend arcu sapien vitae ante. Phasellus bibendum efficitur tortor. Sed auctor sollicitudin placerat. Etiam volutpat eros tellus, nec iaculis orci convallis non. Curabitur vel accumsan augue, sit amet ultricies odio. Morbi luctus tortor in nisl aliquam imperdiet. Sed lobortis congue sem, vel molestie lacus. Duis convallis tortor risus. Suspendisse faucibus nulla quis fermentum vehicula. Duis nec nulla maximus, eleifend ipsum a, interdum tortor.\n' +
      '</p>\n' +
      '<p>\n' +
      'Donec eget pulvinar leo. Aliquam erat volutpat. Quisque tincidunt tempus tortor ac euismod. Nullam lectus ante, efficitur at mollis eget, suscipit non justo. Fusce tempus, purus eu sollicitudin varius, purus metus tristique enim, at aliquam metus neque condimentum nunc. Suspendisse eu risus dictum, pellentesque quam et, tempor mi. Nullam volutpat tincidunt blandit. Ut tempor et velit in auctor. Ut nec purus euismod, eleifend ante id, dictum turpis. Vestibulum a sapien magna. Pellentesque non libero mi. Ut in nibh mauris. Suspendisse semper ullamcorper pellentesque. Donec aliquam libero ac ipsum ullamcorper viverra.\n' +
      '</p>\n' +
      '<p>\n' +
      'Sed vitae leo vitae neque pretium congue a sit amet ante. Nunc imperdiet nisi tincidunt cursus luctus. Sed quis finibus mi. Proin fermentum magna quis enim rhoncus, tincidunt vulputate nisl ullamcorper. Suspendisse lacinia ipsum sed est elementum gravida. Curabitur sit amet lacus nec est semper varius. Suspendisse tempus enim vel bibendum lacinia. Quisque nec ultricies felis, eu eleifend odio. Phasellus enim sem, tristique et hendrerit eget, tincidunt a nunc. Vivamus at augue tincidunt felis luctus vehicula vel at neque. Vivamus facilisis mauris erat, nec molestie mauris fermentum at. Nullam vestibulum magna id orci egestas, rutrum mattis nulla imperdiet. Nulla vitae convallis nibh. Cras risus est, consequat volutpat nunc a, rhoncus sollicitudin ipsum. Proin pharetra vel sapien non interdum.\n' +
      '</p></div>'
  }),

  async mounted() {
    const { employment_id } = this.$route.params
    if (employment_id) {
      this.selectedEmploymentId = parseInt(`${employment_id}`, 10)
      await this.getEmployment()
      this.countPostulants = Object.keys(this.employmentStore.employment?.postulations_resume).length
    } else {
      message.error('Error al obtener información')
      this.back()
    }
  },

  methods: {
    back() {
      this.$router.go(-1)
    },

    async getEmployment() {
      try {
        this.loadingEmployment = true
        await this.employmentStore.getPublicEmployment(this.selectedEmploymentId)
      } catch (e) {
        console.log({ e })
        // this.back()
      } finally {
        this.loadingEmployment = false
      }
    }

  }

})

</script>

<template lang="pug">
.establishment-public-view
  a-layout
    landing-navbar
    a-row(justify="center" :gutter="[16,16]")
      a-col(:xl="{ span: 14 }", :lg="{ span: 16 }", :sm="{ span: 24 }")
        a-card.margin-top__50.margin-bottom__50
          a-button(type="primary", @click="() => $router.go(-1)").margin-right__10 Volver

          .font-size__h4.margin-top__50 Empresa
          a-divider.padding__0.margin__0
          a-row(:gutter="[16,8]", align="middle", justify="start").margin-top__20

            a-col
              div.display__flex
                a-avatar(:size="45")
                div.margin-left__5
                  b.display__block  {{ employmentStore.employment?.establishment?.name }}
                  span 22 de agosto de 2023

          .font-size__h1.text-align__center {{ employmentStore.employment?.title }}
          a-row(:gutter="[16,8]", align="middle", justify="center").margin__0.padding__0

            a-col.display__flex
              div(v-for="etype in EMPLOYMENT_TYPES", :value="etype.key")
                span(v-if="etype.key === employmentStore.employment?.employment_type") 
                  span {{ etype.value }}

              a-divider(type="vertical" style="height: 20px; background-color: #B5B2B2")

              div(v-for="qualification in QUALIFICATIONS", :value="qualification.key")
                span(v-if="qualification.key === employmentStore.employment?.qualification") 
                  span {{ qualification.value }}

              a-divider(type="vertical" style="height: 20px; background-color: #B5B2B2")

              div(v-for="schedule in SCHEDULE_TYPES", :value="schedule.key")
                span(v-if="schedule.key === employmentStore.employment?.schedule_type") 
                  span {{ schedule.value }}

          a-row(:gutter="[16,8]", align="middle", justify="center").margin-top__10.padding__0
            a-col
              div
                UserOutlined.margin-right__5
                span {{ countPostulants }}
                span  postulaciones
              div
                StarOutlined.margin-right__5
                span Revisado por ultima vez hoy


          .font-size__h4.margin-top__50 Descripción
          a-divider.padding__0.margin__0
          span(v-html="employmentStore.employment?.description")

          .font-size__h4.margin-top__50 Requisitos
          a-divider.padding__0.margin__0
          div(v-html="textDefault")

          .font-size__h4.margin-top__50 Beneficios
          a-divider.padding__0.margin__0
          div(v-html="textDefault")



          .font-size__h4.margin-top__50 Postular
          a-divider.padding__0.margin__0
          a-row(:gutter="[16,8]", align="middle", justify="center").margin-top__20
            a-col(v-if="!authStore.isAuthenticated")
              h4
                span Para postular debes
                a(@click="() => $router.push({ name: 'ProfessionalLogin', params: { employment_id: selectedEmploymentId } })")  iniciar sesión
                span  ó
                a(@click="() => $router.push({ name: 'Register', params: { register_type: 'professional', employment_id: selectedEmploymentId } })")  registrate
                span  si aun no lo has echo.
            a-col(v-if="authStore.isAuthenticated")
              a-button(type="primary") Postular


</template>
