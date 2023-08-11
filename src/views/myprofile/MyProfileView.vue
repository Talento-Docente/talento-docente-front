<script lang="ts">
/** External dependencies */
import { defineComponent } from "vue";
/** Store */
import { authStore } from "@/stores/auth.store";

export default defineComponent({

  components: { },

  data() {
    return {
      // TEST
      link: "https://martinvallefotografos.net/wp-content/uploads/2018/12/FOTOGRAFIA-CURRICULUM-ASTURIAS-MARTIN-VALLE-FOTOGRAFOS-01.jpg",
      authStore: authStore(),
      isAuthenticated: false
    };
  },

  mounted() {
    this.isAuthenticated = this.authStore.isAuthenticated;
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
  .title.font-size__h3 Mi Perfil

  a-row.margin-top__20
    a-col(:xs="2" :sm="4" :md="6" :lg="8" :xl="10")
      a-avatar(:src="link" 
        alt="avatar" :size="150")

  a-descriptions(
    title="Mi Informacion Personal" 
    bordered 
    :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }").margin-top__20

    template(#extra)
      a-button(type="primary" @click="toPostulation()" ) Mis Postulaciones
    
    a-descriptions-item(label="Nombres :") Mariano stefan 
    a-descriptions-item(label="Apellido Paterno :") Briceño
    a-descriptions-item(label="Apellido Materno :") Gonzales

    a-descriptions-item(label="Rut :") 15.546.654-6
    a-descriptions-item(label="Fecha de Nacimiento :") 05-10-1986 
    a-descriptions-item(label="Correo :") Marianobriceno@gmail.com

    a-descriptions-item(label="LinkeIn:")
        a Ver Perfil
    a-descriptions-item(label="Youtube :") 
      a youtube.com/ProfeMariano 
    a-descriptions-item(label="Twitter :")
      a @marianoProfe

    a-descriptions-item(label="Experiencia Profesional" :span="3")
        //- texto de prueba
        p Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        div()
            a() Ver CV
    
    


  

</template>