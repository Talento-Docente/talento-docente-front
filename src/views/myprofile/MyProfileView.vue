<script lang="ts">
/** External dependencies */
import { defineComponent } from "vue";
/** Icons */
import {
  MailOutlined,
  PhoneOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from '@ant-design/icons-vue';

export default defineComponent({

  components: {
    MailOutlined,
    PhoneOutlined,
    TwitterOutlined,
    LinkedinOutlined,
   },

  data() {
    return {
      // TEST
      text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      user: {
          id: '3',
          name: 'Baltazar Vega Briones',
          description: {
            titulo:'Docente Artes',
            correo: 'Baltazardocente@colegio.com',
            telefono:'+56912345678',
            twitter:'https://twitter.com',
            linkedin:'https://linkedin.com',
            curriculum:'cv.pdf',
            formacion:{
              uni: "Universidad de Santiago",
              periodo:"2018 - 2022"

            }
          }}

    };
  },

  mounted() {
    
  },
  computed: {},

  methods: {
    toPostulation() {
      this.$router.push({ name: "Postulation" });
    },
  }

});
</script>

<template lang="pug">
.my-profile-show
  a-row(align="middle" justify="space-between")
    a-col()
      .title.font-size__h3 Mi Perfil
    a-col()
      a-button(type="primary" @click="toPostulation()" )
        span Mis Postulaciones
      a-button(type="primary" ).margin-left__5
        span Editar mi perfil


  a-row(align="middle" justify="center" :gutter="[16,16]").margin-top__20
    a-col()
      a-avatar( 
        alt="avatar" :size="85")

    a-col()
      div()
        h3 {{user.name}}
        h4 {{ user.description.titulo }}

  div.margin-top__30
    a-divider()
      a-typography-text(type="secondary")
        span Mi Informacion Personal
        
  a-row(:gutter="[40,8]")
    
    a-col(:span="12" :offset="6")

      div().margin-top__30
        h4
          b Sobre mi
        span {{ text  }}

      div().margin-top__30
        h4
          b Perfil y experiencia laboral
        span {{ text  }}

      div().margin-top__30
        h4
          b Habilidades
        ul
          li Nivel de inglés medio.
          li Trabajo en Equipo
          li Comunicacion efectiva
          li Puntualidad
          li Comunicacion efectiva
          li Empatia

      div().margin-top__30
        h4
          b Formación académica y estudios
        div
          b Institución: 
          span {{ user.description.formacion.uni }}.
        div
          b Titulo: 
          span {{ user.description.titulo }}
        div
          b Periodo: 
          span {{ user.description.formacion.periodo }}



  a-row(justify="space-around").margin-top__30
    a-col
      MailOutlined
      span.margin-left__10 {{user.description.correo}}
    
    a-col
      PhoneOutlined
      span.margin-left__10 {{user.description.telefono}}

    a-col
      LinkedinOutlined
      span.margin-left__10 {{user.description.linkedin}}

    a-col
      TwitterOutlined
      span.margin-left__10 {{user.description.twitter}}

        
</template>