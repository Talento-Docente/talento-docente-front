<script lang="ts">
/** External dependencies */
import { defineComponent, reactive, ref } from 'vue'
import { message } from 'ant-design-vue';

/** Internal dependencies */

/** Interfaces */
import type { LoginInterface } from "@/interfaces/login.interface";

/** Store */
import { authStore } from "@/stores/auth.store";

export default defineComponent({

  data() {
    return {
      /** Form */
      form: reactive<LoginInterface>({
        email: null,
        password: null
      }),
      labelCol: { style: { width: '150px' } },
      wrapperCol: { span: 24 },
      loginType: ref<String>(''),

      /** Loader */
      loading: false
    }
  },

  computed: {
    disabled() {
      return !(this.form.email && this.form.password)
    }
  },

  mounted () {
    const { login_type } = this.$route.params
    this.loginType = String(login_type)
  },

  methods: {
    async onFinish(values: any) {
      this.loading = true
      await authStore()
        .login(values.email, values.password)
        .then(() => {
          message.success('Ingreso exitoso')
          this.$router.push({ name: 'Home' })
        })
        .catch((error) => {
          console.log({ error })
          message.error('Credenciales invalidas')
        })
      this.loading = false
    }
  }

})
</script>

<template lang="pug">
.login
  a-row.login__form
    a-col(:xl="{ span: 8, offset: 8 }", :lg="{ span: 12, offset: 6 }", :sm="{ span: 24, offset: 0 }")
      a-card
        .text-align__center
          p(@click="() => $router.push({ name: 'Landing' })").font-size__20.cursor__pointer Talento Docente {{ loginType === 'professional' ? '(Profesional)' : '(Empresa)' }}

        a-form(:model="form", @finish="onFinish", :label-col="labelCol" :wrapper-col="wrapperCol")

          a-form-item(
            label="Correo"
            name="email"
            :rules="[{ required: true, message: 'Ingrese su correo!' }]")

            a-input(v-model:value="form.email")

          a-form-item(
            label="Contraseña"
            name="password"
            :rules="[{ required: true, message: 'Ingrese su contraseña!' }]")
            a-input-password(v-model:value="form.password")

          a-form-item
            .text-align__center
              a-button(
                :disabled="disabled",
                type="primary",
                html-type="submit",
                class="login-form-button",
                :loading="loading"
              ) Iniciar sesión

          a-form-item
            .text-align__center
              a-button(
                type="link",
              ) Recuperar Contraseña

              a-button(
                type="link",
                @click="() => $router.push({ name: 'Register', params: { register_type: loginType } })"
              ) Registrate aquí




</template>

