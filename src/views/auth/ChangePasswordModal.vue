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
      /** RecoverPassword modal*/
      modalRecoverPass: false,
      labelCol: { style: { width: '150px' } },
      wrapperCol: { span: 24 },
      labelColMessage: { style: { width: '100px' } },
    };
  },

  mounted() {
  },

  methods: {
    openRecoverPassModal(){
      this.modalRecoverPass=true
    },
    
    handleOk () {
      this.modalRecoverPass=false
    },
  }

});
</script>

<template lang="pug">
div
  a-button(
    type="link",
    @click="openRecoverPassModal()"
  ) Recuperar Contraseña
  a-modal(v-model:visible="modalRecoverPass" okText="Enviar" cancelText="Cancelar" @ok="handleOk")
    template(#title)
      h2.text-align__center.margin-top__10 Recuperar contraseña
    h4.text-align__center Ingrese su correo para recuperar su contraseña.
    a-form( :label-col="labelCol" :wrapper-col="wrapperCol").margin-top__30

      a-form-item(:wrapper-col="{ span: 10 }"
        label="Correo",
        name="email"
        :rules="[{ required: true}]")
        a-input()
          
</template>

