<script lang="ts">
/** External dependencies */
import { defineComponent, reactive, ref } from "vue";
/** Store */
import { establishmentStore } from "@/stores/establishment.store";
/** Interfaces */
import type { EstablishmentInterface } from "@/interfaces/establishment.interface";
/** Icons */
import {
  MailOutlined,
  PhoneOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
} from '@ant-design/icons-vue';

export default defineComponent({

components: {
  MailOutlined,
  PhoneOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
},

  setup() {
  return {};
  },

  data: ()=>({
    /** Store */
    establishmentStore: establishmentStore(),

    /** Form */
    formEstablishment: reactive<EstablishmentInterface>({
      name: null,
      address:  null,
      phone: null
    }),

    /** Loader */
    loadingEstablishment:false,

    // TEST
    text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      


  }),

  mounted() {
    this.init();
  },

  methods: {
    async init() {
      try {
        await this.establishmentStore.getEstablishments();
      } catch (error) {
        console.log({ error });
      }
    },

    async getEstablishment(id:number) {
      try {
        this.loadingEstablishment=true
        await this.establishmentStore.getEstablishment(id);
        if(this.establishmentStore.establishment){
          this.formEstablishment = this.establishmentStore.establishment
        }
      } catch (error) {
        console.log(error)
      }finally{
        this.loadingEstablishment=false
      }

    },

    toEmployments() {
      this.$router.push({ name: "EmploymentList" });
    },
  }

});
</script>

<template lang="pug">
a-row(align="middle" justify="space-between")
  a-col()
    .title.font-size__h3 Mi Empresa
  
  a-col()
    a-button(type="primary" @click="toEmployments()")
      span Trabajos publicados
    a-button(type="primary" ).margin-left__5
      span Editar mi empresa
a-row 
  a-col(:span="6")
    a-form()
      a-form-item(label="Establecimiento")
        a-select()
          a-select-option(v-for="establishment in establishmentStore.establishments", 
          :value="establishment.id"
          @click="getEstablishment(establishment.id)"
          ) {{ establishment.name }}

a-divider()

template(v-if="formEstablishment.name")

  a-row(justify="center" align="middle")
    a-col()
      a-avatar( 
          alt="avatar" :size="100")

  a-row(justify="center" align="middle")
    a-col()
      h3 {{ formEstablishment.name }}

  a-row(justify="space-between").margin__30
    a-col
      EnvironmentOutlined
      span.margin-left__10 Serrano #518, Quilicura.
    
    a-col
      PhoneOutlined
      span.margin-left__10 +56994654566
      
      
    a-col
      MailOutlined
      span.margin-left__10 colegio@colegio.com

    a-col
      GlobalOutlined
      a.margin-left__10 www.institutocolegio.cl


  a-divider()
    a-typography-text(type="secondary")
      span Mi Información

  a-row(justify="center").margin-top__30
    a-col(:span="12")
      div
        a-typography-title(:level="4")
          b Sobre nosotros
      div
        span {{ text + text}}

  a-row(justify="center").margin-top__20
    a-col(:span="10")
      a-divider(orientation="left")
        span Misión
      span Nuestra mision consiste en mantener una educacion consistente mediante los mejores metodos de enseñanza

    a-col(:span="10" :offset="2")
      a-divider(orientation="left")
        span Visión
      span Ser una reconocida instución como entidad educacional

  a-row(justify="center").margin-top__20
    a-col(:span="10")
      a-divider(orientation="left")
        span Público
      span Nuestros Alumnos y docentes dan fé del buen ambiente dentro del establecimiento generando y destacando buenas impresiones en el publico

    a-col(:span="10" :offset="2")
      a-divider(orientation="left")
        span Valores
      span Ética, responsabilidad y experticia de nuestros docentes eduacionales.     


</template>