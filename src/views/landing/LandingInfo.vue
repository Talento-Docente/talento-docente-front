<script lang="ts">
/** External dependencies */
import { defineComponent } from "vue";

/** Internal dependencies */
/** Store */
import { authStore } from "@/stores/auth.store";

/** Icon */
import { AntDesignOutlined,
  LeftCircleOutlined,
  RightCircleOutlined
 } from '@ant-design/icons-vue';

export default defineComponent({

  components: {
    AntDesignOutlined,
    LeftCircleOutlined,
    RightCircleOutlined
  },

  setup() {
    return {
    };
  },

  data() {
    return {
      /** Store */
      authStore: authStore()
    };
  },

  async mounted() {
    // await this.employmentStore.getEmployments()
  },

  methods: {}

});
</script>

<template lang="pug">
.landing-jobs
    a-row(justify="center")

      a-col(:xl="{ span: 16 }", :lg="{ span: 16 }", :sm="{ span: 24 }")
          a-row
            a-col(span="24")
              div(class="container")
                h3 Estos establecimientos necesitan de tí
          a-row(justify="center")
            a-col(span="18")
              a-carousel(autoplay)
                div
                  a-image(:width="150" src="https://aliyuncdn.antdv.com/vue.png")
                  a-image(:width="150" src="https://aliyuncdn.antdv.com/logo.png")
                  a-image(:width="150" src="https://aliyuncdn.antdv.com/vue.png")
                  a-image(:width="150" src="https://aliyuncdn.antdv.com/logo.png")
                  a-image(:width="150" src="https://aliyuncdn.antdv.com/vue.png")
                div
                  a-image(:width="150" src="https://aliyuncdn.antdv.com/logo.png")
                  a-image(:width="150" src="https://aliyuncdn.antdv.com/vue.png")
                  a-image(:width="150" src="https://aliyuncdn.antdv.com/logo.png")
                  a-image(:width="150" src="https://aliyuncdn.antdv.com/vue.png")
                  a-image(:width="150" src="https://aliyuncdn.antdv.com/logo.png")

        

          a-row(justify="space-between" :gutter="16").margin-top__50
            a-col(:span="8")
              a-card(class="card-shadow card-beg")
                h2 No publicamos cualquier puesto
                p Los empleos publicados aquí pasan por un estricto control de calidad: personas expertas en tecnología eligiendo los empleos que valen la pena.

            a-col(:span="8")
              a-card(class="card-shadow card-beg")
                h2 No mas Secretos
                p Exigimos a las empresas lo mismo que ellas te exigen a ti: Transparencia total. Es lo justo.

            a-col(:span="8")
              a-card(class="card-shadow card-beg")
                h2 Te ayudamos a ser el mejor profesional
                p No somos solo un portal de empleos. Estamos comprometidos con tu crecimiento profesional.

          a-row().margin-top__50
            a-col(:span="24")
              div( class="div-image")
                div(class="image-content")
                  a-card( class="card-image")
                    h3 Más de 100 establecimientos anuncian aquí.
                    p Startups, corporaciones líderes e importantes agencias de reclutamiento tecnológico están buscando hacerte parte de su equipo.
                    a-row(justify="center")
                      a-button(type="primary" shape="round" size="large").margin-top__10
                        span Ir a Empleos

          a-row().margin-top__50
            a-col(:span="24")
              div(class="container")
                h3 Cantidad, pero sobre todo calidad.
                p Tenemos un equipo de moderación que se encarga de revisar cada uno de los anuncios. Estos son algunos de los requisitos que deben cumplir antes de ser publicados:

          a-row(justify="center" :gutter="[16,16]").margin-top__50
            a-col(:span="10")
              a-card(class="card-beg content")
                h4 
                  b Funciones claras y acordes al puesto.
                p ¡No más cargos imposibles! Sólo permitimos un cargo y nivel de experiencia por empleo.“Se busca unicornio experto junior...”

            a-col(:span="10" :offset="1")
              a-card(class="card-beg content")
                h4
                  b Sueldos acordes (o superiores) al mercado.
                p La industria tecnológica ha crecido gracias a talentos como el tuyo. Es justo que ese crecimiento se refleje en tu salario.

            a-col(:span="10")
              a-card(class="card-beg content")
                h4 
                  b El empleador se debe identificar.
                p Basta de empresas fantasma. Todas las empresas deben estar plenamente identificadas

            a-col(:span="10" :offset="1")
              a-card(class="card-beg content")
                h4
                  b Libre de discriminación o sesgos.
                p Creemos en la importancia de impulsar la igualdad de condiciones en la industria digital sin importar género, edad, nacionalidad, entre otros.

          a-row(justify="center" :gutter="16").margin-top__50
            a-col(:span="4")
              a-button(type="primary" shape="round" size="large") Registrarse

            a-col()
              a-button(type="text" size="large") Ver los empleos
        
          
</template>

<style>
  .test{
    display: flex;
    justify-content: center;
    background-color: red;
  }

  


  .div-image{
    height: 600px;
    background-image: url(https://i.pinimg.com/736x/42/f6/d3/42f6d34c95b49b788b40e991397d4b31.jpg);
    background-position: center center;
    
  }
  .image-content{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card-image{
    max-width: 600px;
    border-radius: 30px;
  }
  .card-shadow{
    box-shadow: 5px 5px 10px 2px #dbd9d9;
  }
  .container{
    max-width: 600px;
    margin: 0 auto;
  }
  .card-beg{
    height: 200px;
    box-shadow: 5px 5px 5px 2px  #ebe9e9 ;
    border-radius: 15px;
  }
  .content{
    height: 100%;
    width: 100%;
  }

  
</style>