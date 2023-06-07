<script lang="ts">
/** External dependencies */
import { defineComponent, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'

/** Internal dependencies */
/** Store */
import { establishmentStore } from '@/stores/establshment.store'

/** Interfaces */
import type { EstablishmentInterface } from '@/interfaces/establishment.interface'

export default defineComponent({

  data: () => ({
    /** Form */
    labelCol: { style: { width: '150px' } },
    wrapperCol: { span: 24 },
    selectedEstablishmentId: ref<number>(0),
    selectedMethod: ref<string | string[]>('new'),
    form: reactive<EstablishmentInterface>({
      name: null,
      address: null,
      phone: null
    }),

    /** Store */
    establishmentStore: establishmentStore(),

    /** Loader */
    loadingEstablishment: false,
    loadingSave: false
  }),

  mounted() {
    const { method, id } = this.$route.params
    if (method && id) {
      this.selectedEstablishmentId = parseInt(`${id}`, 10)
      this.selectedMethod = method
      if (method === 'update') {
        this.getEstablishment()
      }
    } else {
      message.error('Error al obtener información')
      this.back()
    }
  },

  methods: {
    back () {
      this.$router.push({ name: 'EstablishmentList' })
    },

    async getEstablishment() {
      try {
        this.loadingEstablishment = true
        await this.establishmentStore.getEstablishment(this.selectedEstablishmentId)
        if (this.establishmentStore.establishment) {
          this.form = this.establishmentStore.establishment

        } else {
          message.error('Error al obtener información')
          this.back()
        }

      } catch (error) {
        console.log({ error })
        this.back()

      } finally {
        this.loadingEstablishment = false
      }
    },

    async onFinish(values: any) {
      try {
        this.loadingSave = true
        if (this.selectedMethod === 'new') {
          const response = await this.establishmentStore.createEstablishment(values)
          if (response.status !== 'success') {
            message.error('Error al guardar información')
          } else {
            message.success('Actualización exitosa')
            this.back()
          }
        } else {
          const response = await this.establishmentStore.updateEstablishment(this.selectedEstablishmentId, values)
          if (response.status !== 'success') {
            message.error('Error al guardar información')
          } else {
            message.success('Actualización exitosa')
            this.back()
          }
        }

      } catch (error) {
        console.log({ error })
        message.error('Error al guardar información')

      } finally {
        this.loadingSave = false

      }
    }
  }

})

</script>

<template lang="pug">
.establishment-form
  .title.font-size__h3 {{ selectedMethod && selectedMethod === 'update' ? 'Edición' : 'Creación'}} de Establecimiento

  .form.margin-top__40
    a-form(:model="form", @finish="onFinish", :label-col="labelCol" :wrapper-col="wrapperCol")

      a-row
        a-col(:xl="{ span: 8 }", :lg="{ span: 12 }", :sm="{ span: 24 }")

          a-form-item(
            label="Nombre"
            name="name"
            :rules="[{ required: true, message: 'Ingrese nombre de establecimiento' }]")
            a-input(v-model:value="form.name")

          a-form-item(
            label="Dirección"
            name="address"
            :rules="[{ required: true, message: 'Ingrese dirección de establecimiento' }]")
            a-input(v-model:value="form.address")

          a-form-item(
            label="Teléfono"
            name="phone"
            :rules="[{ required: true, message: 'Ingrese telefono de establecimiento' }]")
            a-input(v-model:value="form.phone")

          a-form-item.margin-top__40
            a-space
              a-button(
                type="primary",
                html-type="submit",
                :loading="loadingSave"
              ) Guardar

              a-button(
                type="danger",
                @click="back()",
                :loading="loadingSave"
              ) Cancelar

  .actions

</template>
