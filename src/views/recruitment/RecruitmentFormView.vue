<script lang="ts">
/** External dependencies */
import { defineComponent,reactive, ref } from 'vue'
import { message } from "ant-design-vue";
/** Store */
import { flowStore } from "@/stores/flow.store";

/** Interfaces */
import type { FlowInterface } from "@/interfaces/flow.interface";
import type { StageInterface } from "@/interfaces/stage.interface";

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import type { FormInstance } from 'ant-design-vue';

/** Card add */
interface Domains {
  value: string;
  key: number;
}

export default defineComponent({
    components:{
      MinusCircleOutlined, 
      PlusOutlined

    },

    data: ()=>({
      /** Store */
      flowStore: flowStore(),

       /** Form */
      selectedFlowId: ref<number>(0),
      selectedMethod: ref<string | string[]>("new"),
      formFlow: reactive<FlowInterface>({
        establishment_id: null,
        name: null,
        description: null
      }),
      formStage: reactive<StageInterface>({
        flow_id:null,
        name:null,
        order_number:null,
        description:null,
        stage_type:null
      }),

      /** other */
      color: "#f3f3f3",
      dynamicValidateForm: reactive<{ domains: Domains [] }>({
        domains: [],
      }),
      dynamicstageForm: reactive<{ stages: StageInterface [] }>({
        stages: [],
      }),
      formRef: ref<FormInstance>(),
      typesStages:["normal","document","test","meet","finish"],
      orderNumber:["1","2","3","4","5"],

      /** Loader */
      loadingFlow: false,
    }),

    mounted() {
      const { method, id } = this.$route.params;
      if (method && id) {
        this.selectedFlowId = parseInt(`${id}`, 10);
        this.selectedMethod = method;
        if (method === "new") {
          this.getFlow();
        }
      } else {
        message.error("Error al obtener información");
        // this.back();
      }
        
    },

    methods: {
      async getFlow() {
      try {
        this.loadingFlow = true;
        await this.flowStore.getFlow(this.selectedFlowId);
        if (this.flowStore.flow) {
          this.formFlow = this.flowStore.flow;

        } else {
          message.error("Error al obtener información");
        }

      } catch (error) {
        console.log({ error });

      } finally {
        this.loadingFlow = false;
      }
      },

      addStage(){
        
        this.dynamicstageForm.stages.push({
          flow_id:this.selectedFlowId,
          name:null,
          order_number:null,
          description:null,
          stage_type:null
        })
      },
      removeStage(item: any){
        let index = this.dynamicstageForm.stages.indexOf(item);
        if (index !== -1) {
          this.dynamicstageForm.stages.splice(index, 1);
        }
      },

      showStage(){
        console.log(this.dynamicstageForm)
      }

    }
})
</script>

<template lang="pug">
.stage-view
  .title.font-size__h3 Etapas de reclutamiento 
  div
    h2 {{ formFlow.name }} {{ formFlow.id }}
  .employemnt-form-view
    a-form(
      ref="formRef"
      name="dynamic_form"
      :model="dynamicstageForm")
      a-row(:gutter="[16,16]")
      
        a-col
          div
            a-button( @click="addStage")
              PlusOutlined
              span Agregar etapa

            a-button( @click="showStage")
              PlusOutlined
              span Ver

      a-row(:gutter="[16,16]").margin-top__20
        a-col(
          v-for="(stage, index) in dynamicstageForm.stages")
          div

            a-form-item

              MinusCircleOutlined(
                class="dynamic-delete-button"
                @click="removeStage(stage)")
              a-card(:bodyStyle="{background: color}")
              
                template(#title)
                  div()
                    a-form(:model="formStage")
                      a-form-item(
                          label="Nombre de Etapa"
                          name="name"
                          :rules="[{ required: true, message: 'Ingrese nombre, maximo 20 caracteres',min: 0, max: 20 }]")

                        a-input(v-model:value="stage.name")

                      a-row(:gutter="[16,16]")
                        a-col(:span="12")
                          a-form-item(
                            name="Position"
                            :rules="[{ required: true}]")
                            a-select(v-model:value="stage.stage_type" placeholder="Posicion")
                              a-select-option(v-for="item in orderNumber" :value="item") {{item}}

                        a-col(:span="12")
                          a-form-item(
                            name="type"
                            :rules="[{ required: true}]")
                            a-select(v-model:value="stage.stage_type" placeholder="Tipo de etapa")
                              a-select-option(v-for="item in typesStages" :value="item") {{item}}

                
                a-card-meta 
                  template(#description)
                    a-form-item(
                      label="Descripción"
                      name="description"
                      :rules="[{ required: true, message: 'Ingrese descripción' }]"
                    )
                      a-textarea(v-model:value="stage.description" auto-size)
                    a-card().margin-top__20
                      a-avatar.margin-right__5
                      span Postulante


</template>