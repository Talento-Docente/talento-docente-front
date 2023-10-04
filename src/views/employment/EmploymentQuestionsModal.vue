<script lang="ts">
import { defineComponent } from "vue";

/** Services */
import { QuillEditor } from "@vueup/vue-quill";

export default defineComponent({

  components: { 
    QuillEditor,
  },

  setup() {
    return {};
  },

  data() {
    return {
      /** Form */
      labelCol: { style: { width: '150px' } },
      wrapperCol: { span: 24 },
      /** Options */
      questions: false,

      /** QuestionModal */
      questionModal:false,
    };
  },

  mounted() {
  },

  methods: {
    showModal(){
      this.questionModal = true;
    }
  }

});
</script>

<template lang="pug">
a-row 
  a-col(:span="24")
    span Añadir Preguntas :
    a-checkbox.margin-left__10(v-model:checked="questions")

  a-col(:span="24").margin-top__20
    a-button(v-if="questions" @click="showModal") Añadir Pregunta
    a-modal(width="800px" centered v-model:visible="questionModal" :footer="null" @ok="handleOk")
      template(#title)
          .text-align__center Añadir Pregunta de postulación
      a-form(:label-col="labelCol" :wrapper-col="wrapperCol")

        a-row(:gutter="10" justify="center")
          a-col(:span="22")  
            a-card 
              
              QuillEditor(content-type="html")
              p.font-size__12.color__gray.padding__0.margin__0 Esta pregunta se realizará al aplicante al momento de postular .

              a-button( type="primary" danger).margin-top__20.float-right.margin-left__10
                span Cancelar
              
              a-button(type="primary" html-type="submit").margin-top__20.float-right
                span Guardar

</template>

