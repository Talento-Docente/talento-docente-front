<script lang="ts">
/** External dependencies */
import { defineComponent,reactive, ref } from 'vue'
import { message } from "ant-design-vue";
/** Store */
import { establishmentStore } from "@/stores/establshment.store";
import { flowStore } from "@/stores/flow.store";

/** Interfaces */
import type { FlowInterface } from "@/interfaces/flow.interface";

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import type { FormInstance } from 'ant-design-vue';

/** Testing */
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
      establishmentStore: establishmentStore(),
      flowStore: flowStore(),

       /** Form */
      selectedFlowId: ref<number>(0),
      selectedMethod: ref<string | string[]>("new"),
      formFlow: reactive<FlowInterface>({
        establishment_id: null,
        name: null,
        description: null
      }),

      /** other */
      color: "#f3f3f3",
      dynamicValidateForm: reactive<{ domains: Domains [] }>({
        domains: [],
      }),
      formRef: ref<FormInstance>(),

      /** Loader */
      loadingFlow: false,
    }),

    mounted() {
      const { method, id } = this.$route.params;
      if (method && id) {
        this.establishmentStore.getEstablishments();
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

      addDomain(){
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now(),
        });
      },
      removeDomain(item: any){
        let index = this.dynamicValidateForm.domains.indexOf(item);
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1);
        }
      }

    }
})
</script>

<template lang="pug">
.stage-view
  .title.font-size__h3 Etapas de reclutamiento 
  div
    h2 {{ formFlow.name }}
  .employemnt-form-view
    a-form(
      ref="formRef"
      name="dynamic_form_item"
      :model="dynamicValidateForm")
      a-row(:gutter="[24,16]")
      
        a-col
          a-form-item()
            a-button( @click="addDomain")
              PlusOutlined
              span Add
        a-col(
          v-for="(domain, index) in dynamicValidateForm.domains")

          a-form-item

            MinusCircleOutlined(
              class="dynamic-delete-button"
              @click="removeDomain(domain)")
            a-card(:bodyStyle="{background: color}")
            
              template(#title) Nuevos Postulantes
                div
                  a-card(hoverable).margin-top__5
                    a-avatar.margin-right__5
                    span Postulante
    

    //- a-row(justify="center")
    //-   a-col(:xl="{ span: 24 }", :lg="{ span: 24 }", :sm="{ span: 24 }")

    //-     a-row(:gutter="[20, 20]")
    //-       a-col(:span="6")
    //-         a-card(:bodyStyle="{background: color}")
    //-           template(#title) Nuevos Postulantes
    //-           a-card(hoverable).margin-top__5
    //-             a-avatar.margin-right__5
    //-             span Postulante


</template>