// import Test from './components/Test.vue'
import components from './components'

const install = (app) => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
  })
}

export {
  components,
  install
}
