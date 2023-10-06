<script lang="ts">
import { defineComponent } from "vue";

/** Services */

export default defineComponent({

  components: { 

  },

  setup() {
    return {};
  },

  data() {
    return {
      /** Contact modal*/
      modalContactUs: false,
      labelCol: { style: { width: '150px' } },
      wrapperCol: { span: 24 },
      labelColMessage: { style: { width: '100px' } },
    };
  },

  mounted() {
  },

  methods: {
    openContactUsModal(){
      this.modalContactUs=true
    },
    
    handleOk () {
      this.modalContactUs=false
    },
  }

});
</script>

<template lang="pug">
.text-align__center
  h2 
    b ¿Tienes dudas? 
  span Contactanos haciendo click 
    a(@click="openContactUsModal()") aqui.
    a-modal(v-model:visible="modalContactUs" okText="Enviar" cancelText="Cancelar" @ok="handleOk")
      template(#title)
        h2.text-align__center.margin-top__10 Formulario de contacto
      h4.text-align__center Escribenos y nos contactaremos a la brevedad.
      a-form( :label-col="labelCol" :wrapper-col="wrapperCol").margin-top__30

        a-form-item(:wrapper-col="{ span: 10 }"
          label="Nombre",
          name="name"
          :rules="[{ required: true}]")
          a-input()

        a-form-item(:wrapper-col="{ span: 10 }"
          label="Correo",
          name="email"
          :rules="[{ required: true}]")
          a-input()

        a-form-item(:wrapper-col="{ span: 10 }"
          label="Telefono",
          name="phone_number")
          a-input()

        a-form-item(:wrapper-col="{ span: 10 }"
          label="Asunto",
          name="subject"
          :rules="[{ required: true}]")
          a-input()
        
        a-form-item(:label-col="labelColMessage" :wrapper-col="{ span: 24 }"
          label="Mensaje",
          name="message"
          :rules="[{ required: true}]")
          a-textarea()
          
</template>

