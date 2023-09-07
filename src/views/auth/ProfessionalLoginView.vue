<script lang="ts">
import LandingNavbar from "@/views/landing/LandingNavbar.vue";
/** External dependencies */
import { defineComponent, reactive, ref } from 'vue'
import { message } from 'ant-design-vue';

/** Internal dependencies */

/** Interfaces */
import type { LoginInterface } from "@/interfaces/login.interface";

/** Store */
import { authStore } from "@/stores/auth.store";

/** Icon */
import { UserOutlined,
  BankOutlined
} from '@ant-design/icons-vue';

export default defineComponent({
  components: { LandingNavbar, 
    UserOutlined,
    BankOutlined
   },
  data() {
    return {
      /** Form */
      form: reactive<LoginInterface>({
        email: null,
        password: null
      }),
      labelCol: { style: { width: '150px' } },
      wrapperCol: { span: 24 },

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
  landing-navbar.login-navbar
  a-row.login__bgProfessional
    a-col(:xl="{ span: 14, offset: 5 }", :lg="{ span: 12, offset: 6 }", :sm="{ span: 24, offset: 0 }")
      a-card(:bordered="false" class="border-card").margin-top__50
        .text-align__center
          h3(@click="() => $router.push({ name: 'Landing' })").font-size__20.cursor__pointer 
            b Talento Docente
          p.font-size__20.margin-top__10 Deja que los empleos lleguen a ti
        div(class="content-card" ).login__form
          a-card(class="login-card").margin-top__20
            .text-align__center
              user-outlined(:style="'font-size: 25px;'")
              h2 ¿Ya tienes cuenta registrada?
              h2 Inicia sesión
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
  a-row().login__footer
    a-col(:xl="{ span: 14, offset: 5 }", :lg="{ span: 12, offset: 6 }", :sm="{ span: 24, offset: 0 }")
      .text-align__center
        h2 
          b ¿Tienes dudas? 
        span Consulta nuestras 
          a preguntas frecuentes 
          span o 
          a contactanos.

</template>

<style>

.border-card{
  border-radius: 20px;
}
.content-card{
  margin: 0 auto;
  max-width:500px;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.login-card{
  width: 100%;
  border-radius: 10px;
  background-color: #f2f6f7;
}

</style>

