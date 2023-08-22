<script lang="ts">
/** External dependencies */
import { defineComponent } from "vue";
import draggable from 'vuedraggable'

/** Stores */
import { authStore } from "@/stores/auth.store";
import { employmentStore } from "@/stores/employment.store";

/** Icons */
import {
  FormOutlined,
  LineChartOutlined,
  CommentOutlined,
  LinkedinOutlined,
  PhoneOutlined,
  TwitterOutlined,
  AuditOutlined,
  MailOutlined

} from '@ant-design/icons-vue'

export default defineComponent({

  components: {
    draggable,
    FormOutlined,
    LineChartOutlined,
    CommentOutlined,
    LinkedinOutlined,
    PhoneOutlined,
    TwitterOutlined,
    AuditOutlined,
    MailOutlined

  },

  setup() {
    return {};
  },

  data() {
    return {
      /** Loader */
      loading: false,

      /** Stores */
      authStore: authStore(),
      employmentStore: employmentStore(),

      /** Form */
      list1: [
        {
          id: '1',
          name: 'Felipe Vega',
          description: {
            titulo:'Docente Ingles',
            correo: 'Felipedocente@colegio.com',
            telefono:'+56912345678',
            twitter:'https://twitter.com',
            linkedin:'https://linkedin.com',
            curriculum:'cv.pdf',
          },
        },
        {
          id: '2',
          name: 'Mariana Briones',
          description: {
            titulo:'Docente Matematicas',
            correo: 'Marianadocente@colegio.com',
            telefono:'+56912345678',
            twitter:'https://twitter.com',
            linkedin:'https://linkedin.com',
            curriculum:'cv.pdf',
          },
        },
        {
          id: '3',
          name: 'Baltazar Vega',
          description: {
            titulo:'Docente Artes',
            correo: 'Baltazardocente@colegio.com',
            telefono:'+56912345678',
            twitter:'https://twitter.com',
            linkedin:'https://linkedin.com',
            curriculum:'cv.pdf',
          },
        },
        {
          id: '4',
          name: 'Mauricio Toro',
          description: {
            titulo:'Docente Lenguaje',
            correo: 'Mauriciodocente@colegio.com',
            telefono:'+56912345678',
            twitter:'https://twitter.com',
            linkedin:'https://linkedin.com',
            curriculum:'cv.pdf',
          },
        },
        {
          id: '5',
          name: 'Daniel Pardo',
          description: {
            titulo:'Docente Fisica/ciencias',
            correo: 'Danieldocente@colegio.com',
            telefono:'+56912345678',
            twitter:'https://twitter.com',
            linkedin:'https://linkedin.com',
            curriculum:'cv.pdf',
          },
        },
        {
          id: '6',
          name: 'Jaime Lopez',
          description: {
            titulo:'Docente Gimnasia',
            correo: 'Jaimedocente@colegio.com',
            telefono:'+56912345678',
            twitter:'https://twitter.com',
            linkedin:'https://linkedin.com',
            curriculum:'cv.pdf',
          },
        },
        {
          id: '7',
          name: 'Mauricio Parra',
          description: {
            titulo:'Docente Religion',
            correo: 'MauricioPdocente@colegio.com',
            telefono:'+56912345678',
            twitter:'https://twitter.com',
            linkedin:'https://linkedin.com',
            curriculum:'cv.pdf',
          },
        },
        {
          id: '9',
          name: 'Constanza Gonzalez',
          description: {
            titulo:'Docente Tecnologia',
            correo: 'Constanzadocente@colegio.com',
            telefono:'+56912345678',
            twitter:'https://twitter.com',
            linkedin:'https://linkedin.com',
            curriculum:'cv.pdf',
          },
        },
        {
          id: '8',
          name: 'Julieta Venegas',
          description: {
            titulo:'Docente Musica',
            correo: 'Julietadocente@colegio.com',
            telefono:'+56912345678',
            twitter:'https://twitter.com',
            linkedin:'https://linkedin.com',
            curriculum:'cv.pdf',
          },
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
      },
      open:false,

      /** Design */
      element:{},
      color: "#f3f3f3",
      tabListNoTitle: [
        {
          key: 'postulation',
          tab: 'Postulación',
        },
        {
          key: 'activities',
          tab: 'Actividad',
        },
        {
          key: 'inbox',
          tab: 'Mensajes',
        },
      ],
      key:'postulation',
    };
  },

  async mounted() {
    await this.init()
  },

  methods: {

    async init () {
      try {
        this.loading = true
        const { id } = this.$route.params
        if (!id) {
          throw Error('Not specific employment id')
        }
        await this.employmentStore.getEmployment(Number(id))
      } catch (e) {
        console.log({ e })
        this.$router.push({ name: 'EmploymentList' })
      } finally {
        this.loading = false
      }
    },

    handleChange (value: any) {
      console.log({ value })
    },

    inputChanged (value: any) {
      console.log({ value })
    },

    log (value: any) {
      console.log({ value })
    },

    showModal(element:any){
      this.open = true
      this.element=element
    },

    handleOk() {
      this.open=false
      this.element = {}
    },

    onTabChange(value: string, type: string){
      this.key = value
    }
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
        a-col(v-for="stage in employmentStore.employment?.flow?.stages")
          a-card(:bodyStyle="{ background: color }")
            template(#title) {{ stage.name }}

            draggable(
              :list="list1",
              @change="log",
              group="people",
              item-key="id",
            )
              template(#item="{element}")
                a-card(hoverable @click="showModal(element)").margin-top__5
                  a-avatar.margin-right__5
                  span {{ element.name }}


        //a-col(:span="4")
        //  a-card(:bodyStyle="{background: color}")
        //    template(#title) Realiza test enviados
        //    draggable(
        //      :list="list2",
        //      @change="log",
        //      group="people",
        //      item-key="id",
        //    )
        //      template(#item="{element}")
        //        a-card(hoverable).margin-top__5
        //          span {{ element.name }}
        //
        //a-col(:span="4")
        //  a-card(:bodyStyle="{background: color}")
        //    template(#title) Primer Llamado
        //    draggable(
        //      :list="list3",
        //      @change="log",
        //      group="people",
        //      item-key="id",
        //    )
        //      template(#item="{element}")
        //        a-card(hoverable).margin-top__5
        //          span {{ element.name }}
        //
        //a-col(:span="4")
        //  a-card(:bodyStyle="{background: color}")
        //    template(#title) Entrevista Psicologica
        //    draggable(
        //      :list="list4",
        //      @change="log",
        //      group="people",
        //      item-key="id",
        //    )
        //      template(#item="{element}")
        //        a-card(hoverable).margin-top__5
        //          span {{ element.name }}
        //
        //a-col(:span="4")
        //  a-card(:bodyStyle="{background: color}")
        //    template(#title) Posibles Candidatos
        //    draggable(
        //      :list="list5",
        //      @change="log",
        //      group="people",
        //      item-key="id",
        //    )
        //      template(#item="{element}")
        //        a-card(hoverable).margin-top__5
        //          span {{ element.name }}
        //
        //a-col(:span="4")
        //  a-card(:bodyStyle="{background: color}")
        //    template(#title) Contratado
        //    draggable(
        //      :list="list6",
        //      @change="log",
        //      group="people",
        //      item-key="id",
        //    )
        //      template(#item="{element}")
        //        a-card(hoverable).margin-top__5
        //          span {{ element.name }}

  //a-modal(v-model:visible="open"
  //        @ok="handleOk"
  //        width="1000px"
  //        :bodyStyle="{background: color}"
  //        :footer="null")
  //
  //  a-row().margin-top__20
  //    a-col(:span="10")
  //      div()
  //        a-row(:gutter="[16,8]")
  //          a-col
  //            a-avatar(:size="50")
  //          a-col
  //            h3 {{ element.name }}
  //
  //      div()
  //        a-typography-text(strong)
  //          span {{ element.description.titulo }}
  //
  //      div().margin-top__20
  //        MailOutlined
  //        span.margin-left__10 {{ element.description.correo }}
  //
  //      div().margin-top__10
  //        PhoneOutlined
  //        span.margin-left__10 {{ element.description.telefono }}
  //
  //      div().margin-top__10
  //        TwitterOutlined
  //        a.margin-left__10 {{ element.description.twitter }}
  //
  //      div().margin-top__10
  //        LinkedinOutlined
  //        a.margin-left__10 {{ element.description.linkedin }}
  //
  //      div().margin-top__10
  //        AuditOutlined
  //        a().margin-left__10 Ver CV
  //
  //
  //      //- Modal Right side
  //    a-col(:span="14")
  //      a-card(:tab-list="tabListNoTitle"
  //        :active-tab-key="key"
  //        @tabChange="key => onTabChange(key, 'key')"
  //        :headStyle="{background: color}").margin-top__10
  //        //- icons
  //        template(#customTab="item")
  //          div(v-if="item.key === 'postulation'")
  //            FormOutlined
  //            span Postulaciones
  //
  //          div(v-if="item.key === 'activities'")
  //            LineChartOutlined
  //            span Actividades
  //
  //          div(v-if="item.key === 'inbox'")
  //            CommentOutlined
  //            span Mensajes
  //
  //        //-vistas de modal
  //        div(v-if="key === 'postulation'")
  //          h2 Habilidades Del postulante
  //
  //        div(v-else-if="key === 'activities'")
  //          h2 Actividades
  //
  //        div(v-else-if="key === 'inbox'")
  //          h2 Mensajes

</template>

