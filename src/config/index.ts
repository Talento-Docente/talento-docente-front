export default {
  nodeEnv: import.meta.env.NODE_ENV || 'development',
  urlApi: import.meta.env.VITE_URL_API || 'http://localhost:3000',
  selfUrl: import.meta.env.VITE_SELF_URL || 'http://localhost:8080'
}
