export default {
  nodeEnv: import.meta.env.NODE_ENV || 'development',
  urlApi: import.meta.env.VUE_APP_URL_API || 'http://localhost:3000',
  selfUrl: import.meta.env.VUE_APP_SELF_URL || 'http://localhost:8080'
}
