<script lang="ts">
/** External dependencies */
import { defineComponent, reactive, ref } from 'vue'
import type { FormInstance } from 'ant-design-vue';
import { message as aMessage } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';

/** Internal dependencies */

/** Interfaces */
import type { RegisterInterface, SendRegisterInterface } from "@/interfaces/register.interface";
import type { EstablishmentInterface } from "@/interfaces/establishment.interface";
import type { TermInterface } from "@/interfaces/term.interface";

/** Store */
import { onboardingStore } from "@/stores/onboarding.store";

/** Icons */
import {
  RightOutlined,
  LeftOutlined
} from '@ant-design/icons-vue'

/** Utils */
import { checkRut } from '@/utils/dniUtil'
import { validateEmail } from '@/utils/string'

/** Constants */
import { TERMS } from '@/constants/terms.constants'

export default defineComponent({

  components: {
    RightOutlined,
    LeftOutlined
  },

  setup () {
    const refFormTerms = ref<FormInstance>()
    const refFormRegisterEstablishment = ref<FormInstance>()
    const refFormRegisterUser = ref<FormInstance>()
    return {
      refFormRegisterUser,
      refFormTerms,
      refFormRegisterEstablishment
    }
  },

  data() {
    return {
      /** Form */
      registerType: ref<string>(''),
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }

      /** Form User */,
      formRegisterUser: reactive<RegisterInterface>({
        id: null,
        name: '',
        last_name: '',
        first_name: '',
        email: '',
        dni: '',
        birthday: '',
        password: '',
        password_confirmation: '',
      }),

      /** Form Establishment */
      formRegisterEstablishment: reactive<EstablishmentInterface>({
        dni: null,
        name: null,
        address: null,
        phone: null,
      }),

      /** Form Terms */
      formTerms: reactive<TermInterface>({
        check: false
      }),

      /** Steps */
      currentStep: ref<number>(0),

      /** Constants */
      terms: TERMS,

      /** Stores */
      onboardingStore: onboardingStore(),

      /** Loader */
      loading: false,
    }
  },

  mounted () {
    const { register_type } = this.$route.params
    this.registerType = String(register_type)
  },

  methods: {

    async validatePassword (rule: Rule, value: string) {
      if (value === '') {
        return Promise.reject('Por favor ingrese contraseña');
      } else if (value.length < 8 || value.length > 24) {
        return Promise.reject('Contraseña debe poseer minimo 8 caracteres y máximo 24');
      } else {
        return Promise.resolve();
      }
    },

    async validateConfirmPassword (rule: Rule, value: string) {
      if (value === '') {
        return Promise.reject('Ingrese confirmación de contraseña');
      } else if (value !== this.formRegisterUser.password) {
        return Promise.reject("Las contraseñas no son idénticas");
      } else {
        return Promise.resolve();
      }
    },

    async validateUserDni (rule: Rule, value: string) {
      if (value === '') {
        return Promise.reject('Por favor ingrese Rut');

      } else if (value !== '' && !checkRut(value)) {
        return Promise.reject('Rut no valido');

      } else if (value !== '' && checkRut(value)) {
        let response = await this.onboardingStore.validateUserDni(value)
        if (response.status === 'success') {
          return Promise.resolve();
        } else {
          return Promise.reject('Rut ya registrado en el sistema');
        }

      } else {
        return Promise.resolve();
      }
    },

    async validateUserEmail (rule: Rule, value: string) {
      if (value === '') {
        return Promise.reject('Por favor ingrese Email');

      } else if (value !== '' && !validateEmail(value)) {
        return Promise.reject('Email no valido');

      } else if (value !== '' && validateEmail(value)) {
        let response = await this.onboardingStore.validateUserEmail(value)
        if (response.status === 'success') {
          return Promise.resolve();
        } else {
          return Promise.reject('Email ya registrado en el sistema');
        }

      } else {
        return Promise.resolve();
      }
    },

    async validateEstablishmentDni (rule: Rule, value: string) {
      if (value === '') {
        return Promise.reject('Por favor ingrese Rut');

      } else if (value !== '' && !checkRut(value)) {
        return Promise.reject('Rut no valido');

      } else if (value !== '' && checkRut(value)) {
        let response = await this.onboardingStore.validateEstablishmentDni(value)
        if (response.status === 'success') {
          return Promise.resolve();
        } else {
          return Promise.reject('Rut ya registrado en el sistema');
        }

      } else {
        return Promise.resolve();
      }
    },

    async validatorTerm (rule: Rule, value: boolean) {
      if (!value) {
        return Promise.reject('Favor validar terminos y condiciones');
      } else {
        return Promise.resolve();
      }
    },

    backStep () {
      if (this.currentStep > 0) {
        this.currentStep -= 1
      } else {
        this.$router.push({ name: 'Login', params: { login_type: this.registerType } })
      }
    },

    async saveUser() {
      this.currentStep = 1
    },

    async saveEstablishment() {
      this.currentStep = 2
    },

    async saveTerms() {
      const params = {
        register_type: this.registerType,
        user: this.formRegisterUser,
        establishment: this.formRegisterEstablishment
      } as SendRegisterInterface
      console.log({ params })
      try {
        this.loading = true
        const { status, message } = await this.onboardingStore.register(params)
        if (status === 'error') {
          aMessage.error(String(message))
        } else {
          this.$router.push({ name: 'Login' })
          aMessage.success('Registro exitoso')
        }
      } catch (error) {
        console.log({ error })
        aMessage.error('Error al registrar usuario')
      } finally {
        this.loading = false
      }
    }
  }

})
</script>

<template lang="pug">
a-layout.register
  a-row(:gutter="0")
    a-col(:lg="{ span: 10 }", :sm="{ span: 24 }")
      a-row(justify="space-around" align="middle").register__steps
        a-col(:xl="{ span: 14 }", :lg="{ span: 16 }", :sm="{ span: 22 }")
          a-steps(direction="vertical", :current="currentStep")
            a-step(:key="1")
              template(#title)
                .color__white Información {{ registerType === 'establishment' ? 'representante' : 'profesional'}}.
              template(#description)
                p.color__white Llenar datos asociados al representante del establecimiento que va a crear cuenta.

            a-step(:key="2", v-if="registerType === 'establishment'")
              template(#title)
                .color__white Información de establecimiento.
              template(#description)
                p.color__white Llenar datos asociados al establecimiento.

            a-step(:key="3")
              template(#title)
                .color__white  Aceptar Términos.
              template(#description)
                p.color__white Favor leer y aceptar termminos de acuerdos y condiciones.

    a-col(:lg="{ span: 14 }", :sm="{ span: 24 }")
      a-row(justify="space-around" align="middle").register__form
        a-col(:xl="{ span: 14 }", :lg="{ span: 16 }", :sm="{ span: 22 }")

          .logo(@click="() => $router.push({ name: 'Landing' })")
            p.font-size__30.text-align__center Talento Docente

          template(v-if="currentStep === 0")

            p.font-size__20 Registro de {{ registerType === 'establishment' ? 'representante' : 'profesional' }}:

            a-form(
              ref="refFormRegisterUser",
              :model="formRegisterUser",
              @finish="saveUser",
              :label-col="labelCol",
              :wrapper-col="wrapperCol",
            )

              a-row(:gutter="[20, 0]")
                a-col(:lg="{ span: 12 }", :sm="{ span: 24 }")
                  a-form-item(
                    label="Nombres",
                    name="first_name",
                    :rules="[{ required: true, message: 'Ingrese Nombres' }]")
                    a-input(v-model:value="formRegisterUser.first_name")

                a-col(:lg="{ span: 12 }", :sm="{ span: 24 }")
                  a-form-item(
                    label="Apellidos",
                    name="last_name",
                    :rules="[{ required: true, message: 'Ingrese apellidos' }]")
                    a-input(v-model:value="formRegisterUser.last_name")

                a-col(:lg="{ span: 12 }", :sm="{ span: 24 }")
                  a-form-item(
                    label="Rut (Sin puntos ni guión)",
                    name="dni",
                    :rules="[{ required: true, validator: validateUserDni }]")
                    a-input(v-model:value="formRegisterUser.dni")

                a-col(:lg="{ span: 12 }", :sm="{ span: 24 }")
                  a-form-item(
                    label="Fecha de Nacimiento",
                    name="birthday",
                    :rules="[{ required: true, message: 'Ingrese su fecha de nacimiento' }]")
                    a-input(type="date", v-model:value="formRegisterUser.birthday")

                a-col(:lg="{ span: 24 }", :sm="{ span: 24 }")
                  a-form-item(
                    label="Correo",
                    name="email",
                    :rules="[{ required: true, validator: validateUserEmail }]")
                    a-input(v-model:value="formRegisterUser.email")

                a-col(:lg="{ span: 12 }", :sm="{ span: 24 }")
                  a-form-item(
                    label="Contraseña",
                    name="password",
                    has-feedback,
                    :rules="[{ required: true, validator: validatePassword }]")
                    a-input-password(v-model:value="formRegisterUser.password", autocomplete="off")

                a-col(:lg="{ span: 12 }", :sm="{ span: 24 }")
                  a-form-item(
                    label="Repetir Contraseña",
                    name="password_confirmation",
                    :rules="[{ required: true, validator: validateConfirmPassword }]")
                    a-input-password(v-model:value="formRegisterUser.password_confirmation", autocomplete="off")

              a-form-item
                .text-align__right
                  a-button(
                    type="primary",
                    @click="backStep()",
                    size="large",
                  ).margin-right__10
                    left-outlined
                    span Volver

                  a-button(
                    type="primary",
                    html-type="submit",
                    :loading="loading",
                    size="large",
                  )
                    span Continuar
                    right-outlined

          template(v-if="currentStep === 1 && registerType === 'establishment'")

            p.font-size__20 Ingresar información del establecimiento:

            a-form(
              ref="refFormRegisterEstablishment",
              :model="formRegisterEstablishment",
              @finish="saveEstablishment",
              :label-col="labelCol",
              :wrapper-col="wrapperCol",
            )

              a-row(:gutter="[20, 0]")
                a-col(:lg="{ span: 24 }", :sm="{ span: 24 }")
                  a-form-item(
                    label="Rut de Establecimiento",
                    name="dni",
                    :rules="[{ required: true, validator: validateEstablishmentDni }]")
                    a-input(v-model:value="formRegisterEstablishment.dni")

                a-col(:lg="{ span: 24 }", :sm="{ span: 24 }")
                  a-form-item(
                    label="Nombre de Establecimiento",
                    name="name",
                    :rules="[{ required: true, message: 'Ingrese nombre' }]")
                    a-input(v-model:value="formRegisterEstablishment.name")

                a-col(:lg="{ span: 24 }", :sm="{ span: 24 }")
                  a-form-item(
                    label="Dirección de Establecimiento",
                    name="address",
                    :rules="[{ required: true, message: 'Ingrese dirección' }]")
                    a-input(v-model:value="formRegisterEstablishment.address")

                a-col(:lg="{ span: 24 }", :sm="{ span: 24 }")
                  a-form-item(
                    label="Teléfono de Establecimiento",
                    name="phone",
                    :rules="[{ required: true, message: 'Ingrese teléfono de contacto' }]")
                    a-input(v-model:value="formRegisterEstablishment.phone")

              a-form-item
                .text-align__right
                  a-button(
                    type="primary",
                    @click="backStep()",
                    size="large",
                  ).margin-right__10
                    left-outlined
                    span Volver

                  a-button(
                    type="primary",
                    html-type="submit",
                    :loading="loading",
                    size="large",
                  )
                    span Continuar
                    right-outlined

          template(v-if="currentStep === 2 || (currentStep === 1 && registerType === 'professional')")

            p.font-size__20 Revise terminos y condiciones del sistema:

            a-form(
              ref="refFormTerms",
              :model="formTerms",
              @finish="saveTerms",
              :label-col="labelCol",
              :wrapper-col="wrapperCol",
            )
              a-row(:gutter="[20, 0]")

                a-col(:lg="{ span: 24 }", :sm="{ span: 24 }")

                  a-card
                    div(v-html="terms").height__300px.overflow__y

                a-col(:lg="{ span: 24 }", :sm="{ span: 24 }")

                  a-form-item(
                    name="check",
                    :rules="[{ required: true, validator: validatorTerm }]")
                    a-checkbox(v-model:checked="formTerms.check") Aceptar terminos y condiciones

              a-form-item
                .text-align__right
                  a-button(
                    type="primary",
                    @click="backStep()",
                    size="large",
                  ).margin-right__10
                    left-outlined
                    span Volver

                  a-button(
                    type="primary",
                    html-type="submit",
                    :loading="loading",
                    size="large",
                  )
                    span Crear Cuenta
                    right-outlined


</template>

