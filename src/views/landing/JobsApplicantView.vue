<script lang="ts">
/** Interfaces */
import type { TableColumnsType } from 'ant-design-vue'
/** Store */
import { applicantStore } from '@/stores/applicant.store'
/** External dependencies */
  import { defineComponent, ref } from 'vue'
  import { 
  SettingOutlined,
  EditOutlined, 
  EllipsisOutlined,
  IdcardOutlined
  } from '@ant-design/icons-vue'

  export default defineComponent({
    components: {
      SettingOutlined,
      EditOutlined, 
      EllipsisOutlined,
      IdcardOutlined
    },
    data: () => ({

    /** Store */
    applicantStore: applicantStore(),

    /** Loader */
    loadingApplicant: false
  }),
  mounted () {
    this.init()
  },

  methods: {
    async init () {
      try {
        this.loadingApplicant = true
        await this.applicantStore.getApplicants()
      } catch (error) {
        console.log({ error })
      } finally {
        this.loadingApplicant = false
      }
    }
  }

  })
</script>
<template lang="pug">
.landing
  .logo
  .title.font-size__h3 Postulantes
  .filter
    a-row(justify="center")
      a-col(:span="8")
        a-input-search(
            placeholder="Buscar..."
            enter-button)

  .jobsApplicants.margin-top__30
    a-row(type="flex" :gutter="[20,20]")
      div(v-for="item in applicantStore.applicants")
        a-col
          a-card( style="width: 250px")
            template(#cover)
              img(
                alt="example"
                :src="item.user.picture")
            a-card-meta
              template(#title)
                span {{ item.user.first_name }} {{item.user.last_name  }}
              template(#description)
                span {{item.id}}
              template(#avatar)
                a-avatar(:src="item.user.picture")
            template(#actions)
              a-button(
              type="outline-success",
              @click="() => $router.push({ name: 'ApplicantShow', params: { id: `${item.id}` }})"
              )
                IdcardOutlined
                span Ver Perfil
              ellipsis-outlined(key="ellipsis")
    
</template>