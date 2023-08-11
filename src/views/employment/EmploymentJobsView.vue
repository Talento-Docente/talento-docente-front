<script lang="ts">
/** External dependencies */
import { defineComponent } from "vue";
import draggable from 'vuedraggable'

export default defineComponent({

  components: {
    draggable
  },

  setup() {
    return {};
  },

  data() {
    return {
      /** Form */
      list1: [
        {
          id: '1',
          name: 'Felipe Vega',
          description: 'Docente',
        },
        {
          id: '2',
          name: 'Mariana Briones',
          description: '2',
        },
        {
          id: '3',
          name: 'Baltazar Vega',
          description: '3',
        },
        {
          id: '4',
          name: 'Mauricio Toro',
          description: '4',
        },
        {
          id: '5',
          name: 'Daniel Pardo',
          description: '5',
        },
        {
          id: '6',
          name: 'Jaime Lopez',
          description: '6',
        },
        {
          id: '7',
          name: 'Mauricio Parra',
          description: '7',
        },
        {
          id: '9',
          name: 'Constanza Gonzalez',
          description: '9',
        },
        {
          id: '8',
          name: 'Julieta Venegas',
          description: '8',
        }
      ],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      list6: [],
      activeNames: [],

      /** Draggable Config */
      componentData: {
        // onChange: this.handleChange,
        // onInput: this.inputChanged,
        // wrap: true,
        // value: this.activeNames
      }
    };
  },

  mounted() {
  },

  methods: {
    handleChange (value: any) {
      console.log({ value })
    },
    inputChanged (value: any) {
      console.log({ value })
    },
    log (value: any) {
      console.log({ value })
    },
  }

});
</script>

<template lang="pug">
.employemnt-form-view
  a-row(justify="center")
    a-col(:xl="{ span: 24 }", :lg="{ span: 24 }", :sm="{ span: 24 }")

      h3 Postulación: Docente de Básica Matematicas
      h2 Proceso

      a-row(:gutter="[20, 20]")
        a-col(:span="4")
          a-card
            template(#title) Nuevos Postulantes
            draggable(
              :list="list1",
              @change="log",
              group="people",
              item-key="id",
            )
              template(#item="{element}")
                a-card.margin-top__5
                  span {{ element.name }}

        a-col(:span="4")
          a-card
            template(#title) Realiza test enviados
            draggable(
              :list="list2",
              @change="log",
              group="people",
              item-key="id",
            )
              template(#item="{element}")
                a-card.margin-top__5
                  span {{ element.name }}

        a-col(:span="4")
          a-card
            template(#title) Primer Llamado
            draggable(
              :list="list3",
              @change="log",
              group="people",
              item-key="id",
            )
              template(#item="{element}")
                a-card.margin-top__5
                  span {{ element.name }}

        a-col(:span="4")
          a-card
            template(#title) Entrevista Psicologica
            draggable(
              :list="list4",
              @change="log",
              group="people",
              item-key="id",
            )
              template(#item="{element}")
                a-card.margin-top__5
                  span {{ element.name }}

        a-col(:span="4")
          a-card
            template(#title) Posibles Candidatos
            draggable(
              :list="list5",
              @change="log",
              group="people",
              item-key="id",
            )
              template(#item="{element}")
                a-card.margin-top__5
                  span {{ element.name }}

        a-col(:span="4")
          a-card
            template(#title) Contratado
            draggable(
              :list="list6",
              @change="log",
              group="people",
              item-key="id",
            )
              template(#item="{element}")
                a-card.margin-top__5
                  span {{ element.name }}

</template>

