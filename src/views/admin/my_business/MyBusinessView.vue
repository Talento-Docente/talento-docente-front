<script lang="ts">
/** External dependencies */
import * as uuid from "uuid";
import { defineComponent, reactive, ref } from "vue";
import type { UploadProps } from "ant-design-vue";
import { message as aMessage } from "ant-design-vue/lib/components";

/** Constant */
import config from '@/config'

/** Store */
import { establishmentStore } from "@/stores/establishment.store";
import { authStore } from "@/stores/auth.store";

/** Interfaces */
import type { EstablishmentInterface } from "@/interfaces/establishment.interface";

/** Services */
import userServices from "@/services/user.services";

/** Icons */
import {
  MailOutlined,
  PhoneOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
} from '@ant-design/icons-vue';

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default defineComponent({

  components: {
    MailOutlined,
    PhoneOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    EnvironmentOutlined,
    GlobalOutlined,
  },

  setup() {
    return {};
  },

  data: ()=>({
    config,

    /** Store */
    establishmentStore: establishmentStore(),
    authStore: authStore(),

    /** Form */
    formEstablishment: reactive<EstablishmentInterface>({
      dni: '',
      name: '',
      address:  '',
      phone: '',
      picture: null
    }),

    /** Files */
    pictureList: ref<UploadProps['fileList']>([]),
    headers: { 'Authorization': authStore().token },

    /** Loader */
    loading: false,
    loadingUpload: false
  }),

  mounted() {
    const establishment = this.authStore.selectedEstablishment
    console.log({ establishment })
    this.formEstablishment = establishment
    if (establishment.picture) {
      console.log(establishment.picture)
      this.pictureList?.push(
        {
          uid: uuid.v4(),
          name: 'picture.png',
          status: 'done',
          url: establishment.picture,
          thumbUrl: establishment.picture
        }
      )
    }
  },

  methods: {

    async updateEstablishment (values: EstablishmentInterface) {
      try {
        this.loading = true
        const response = await userServices.updateEstablishment(this.authStore.selectedEstablishmentId, values)
        if (response.data.status === 'success') {
          aMessage.success('Guardado exitoso')
        } else {
          aMessage.error('Error al guardar datos')
        }
      } catch (e) {
        console.log({ e })
        aMessage.error('Error al guardar datos')
      } finally {
        this.loading = false
      }
    },

    async handlePreview (file: any) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      window.open(file.url, '_blank')
    },

    async handleRemove (documentName: string) {
      try {
        this.loadingUpload = true
        const response = await userServices.removeEstablishmentFile(Number(this.authStore.selectedEstablishment.id), documentName)
        if (response.data.status === 'success') {
          aMessage.success('Eliminación exitosa')
          await this.authStore.getProfile()
          // this.init()
        } else {
          aMessage.error('Error al elimnar')
        }
      } catch (e) {
        console.log({ e })
        aMessage.error('Error al eliminar datos')
      } finally {
        this.loadingUpload = false
      }
    },
  }

});
</script>

<template lang="pug">
.my-establishment-show
  a-row(align="middle" justify="center" :gutter="[16,16]")
    a-col(:lg="{ span: 12 }", :md="{ span: 18 }")
      .title.font-size__h3 Completa el perfil de tu Empresa

      a-form(ref="refFormEstablishment", :model="formEstablishment", @finish="updateEstablishment")
        .margin-top__30
          a-divider
            a-typography-text(type="secondary")
              span Información Básica

          a-row

            a-col(:sm="12")
              h4 Logo Empresa
              p.font-size__12.color__gray.padding__0.margin__0 Minimo 200x200 px, Cuadrara
              p.font-size__12.color__gray.padding__0.margin__0 (Igual que el avatar de Facebook o Whatsapp).

            a-col(:sm="12")
              a-form-item
                a-upload(
                  list-type="picture-card",
                  v-model:file-list="pictureList",
                  :action="`${config.urlApi}/api/establishments/${authStore.selectedEstablishment.id}/users/upload/establishment/picture`",
                  :headers="headers",
                  :loading="loadingUpload",
                  @preview="handlePreview",
                  @remove="() => handleRemove('picture')"
                )
                  template(v-if="pictureList.length <= 0")
                    plus-outlined.margin-right__5
                    .ant-upload-text Cargar...

            a-divider

            a-col(:sm="12")
              h4 Nombre
              p.font-size__12.color__gray.padding__0.margin__0 Nombre del negocio.

            a-col(:sm="12")
              a-form-item(
                name="name",
                :rules="[{ required: true, message: 'Ingrese nombre' }]"
              )
                a-input(v-model:value="formEstablishment.name", placeholder="Nombre")

            a-divider

            a-col(:sm="12")
              h4 Rut

            a-col(:sm="12")
              a-form-item(
                name="dni",
                :rules="[{ required: false }]"
              )
                a-input(v-model:value="formEstablishment.dni", placeholder="Rut", disabled)

            a-divider

            a-col(:sm="12")
              h4 Dirección
              p.font-size__12.color__gray.padding__0.margin__0 Ingrese dirección del establecimiento.

            a-col(:sm="12")
              a-form-item(
                name="address",
                :rules="[{ required: false }]"
              )
                a-input(v-model:value="formEstablishment.address", placeholder="Dirección")

            a-divider

            a-col(:sm="12")
              h4 Telefono de Contacto
              p.font-size__12.color__gray.padding__0.margin__0 Telefono de contacto.

            a-col(:sm="12")
              a-form-item(
                name="phone",
                :rules="[{ required: false }]"
              )
                a-input(v-model:value="formEstablishment.phone", placeholder="Telèfono")

        .margin-top__100
          .float-right
            a-button(
              type="primary",
              html-type="submit",
              :loading="loading",
              size="large") Guardar Cambios


</template>
