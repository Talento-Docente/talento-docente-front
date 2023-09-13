<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

/** External dependencies */
import { message, type SelectProps } from "ant-design-vue";

/** Interfaces */
import type { SkillInterface, MySkillInterface } from "@/interfaces/skill.interface";

/** Stores */
import { authStore } from "@/stores/auth.store";
import { skillStore } from "@/stores/skill.store";

/** Icons */
import {
  UserAddOutlined,
} from "@ant-design/icons-vue";
import { values } from "lodash";

export default defineComponent({

  components: {UserAddOutlined  },

  setup() {
    return {};
  },

  data() {
    return {
      /** Stores */
      authStore: authStore(),
      skillStore: skillStore(),

      /** Abilities */
      options : reactive({
        data: [{}]
      }),

      formSkills: reactive<MySkillInterface>({
        reference_id: 0,
        reference_type: 'Applicant',
        skills: []
      }),

      /** Loader */
      loading : false
    };
  },

  async mounted() {
    await this.init()
  },

  methods: {

    async init(){
      try {
        await this.optionSelect()
      } catch (e) {
        console.log(e)
      }
    },

    async optionSelect(){
      try {
        const userId = parseInt(`${this.authStore.user.id}`, 10)
        this.formSkills.reference_id = userId
        this.loading = true

        const data = this.authStore.user.skills.map(skill => ({
        value: skill.skill,
        }))
        this.formSkills.skills = data

        await this.getSkillsOptions()
      } catch (e) {
        console.log(e)
      }finally{
        this.loading = false
      }
      
    },

    async getSkillsOptions(){
      try {
        const getOptions = await this.skillStore.getSkills()
        const options = getOptions.map(skill => ({
          value: skill.skill,
        }))
        this.options.data = options
      } catch (e) {
        console.log(e)
      }
    },
    
    async handleChange (value: []) {
      //funcion Al cambiar el tag en habilidades
      await this.saveAbilities()
    },

    async saveAbilities(){
      try {
        this.loading = true
        const response = await this.skillStore.createSkill(this.formSkills)
        if (response.status !== 'success') {
          message.error('Error al guardar información')
        } else {
          message.success('Habilidades Guardadas')
        }
      } catch (e) {
        console.log(e)
      }finally{
        this.getSkillsOptions()
        this.loading = false
      }
    },
  }

});
</script>

<template lang="pug">
a-row
  a-col(:xl="12")
    h4.font-weight__bold
      UserAddOutlined
      span.margin-left__10 Añade tus habilidades
    
  a-col(:xl="12")
    a-form(:model="formSkills" @finish="saveAbilities")
      a-select(
        mode="tags"
        style="width: 100%"
        :token-separators="[',']"
        placeholder="Agregar habilidades"
        v-model:value="formSkills.skills"
        :options="options.data"
        @change="handleChange")
      //- a-button(type="primary" html-type="submit" ).margin-left__10 Guardar
</template>

@/interfaces/skill.interface