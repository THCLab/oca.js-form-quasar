import { boot } from 'quasar/wrappers'
import { install } from 'oca.js-form-quasar'

export default boot(({ app }) => {
  app.use({ install })
})
